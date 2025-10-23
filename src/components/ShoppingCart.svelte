<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import Icons from './Icons.svelte';

  /** props */
  export let loading = false;
  export let items = []; // may be either GraphQL shape (item.node...) or minimal stored shape
  export let onAddProduct;
  export let onRemoveProduct;
  export let onClose;

  // internal normalized items used by the UI (GraphQL-like shape expected by this component)
  let normalized = [];

  // currency used across the cart
  let currency = 'KES';

  // currency formatter (adjust locale/currency as you need)
  function makeFormatter(c) {
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: c,
        minimumFractionDigits: 2
      });
    } catch (e) {
      return { format: (v) => (Number(v) || 0).toFixed(2) };
    }
  }
  let formatter = makeFormatter(currency);

  function safeGetImage(item) {
    return item?.node?.merchandise?.product?.images?.edges?.[0]?.node?.originalSrc ?? '';
  }

  // Convert stored minimal payload items back into the GraphQL-like shape this UI expects
  function normalizeStoredItems(storedItems = [], storedCurrency = 'KES') {
    return storedItems.map((it) => {
      return {
        node: {
          id: it.lineId ?? `line-${it.productId}-${Math.random().toString(36).slice(2,8)}`,
          quantity: Number(it.quantity ?? 1),
          merchandise: {
            id: it.productId ?? null,
            title: it.variantTitle ?? '',
            product: {
              title: it.title ?? '',
              images: {
                edges: [
                  { node: { originalSrc: it.image ?? '' } }
                ]
              }
            }
          },
          estimatedCost: {
            totalAmount: {
              amount: Number(it.unitPrice ?? 0).toFixed(2),
              currencyCode: storedCurrency
            }
          }
        }
      };
    });
  }

  // If incoming `items` are already GraphQL-like, we keep them. If they look like stored minimal items (no .node), we normalize.
  function normalizeIncomingItems(rawItems) {
    if (!Array.isArray(rawItems)) return [];
    // detect GraphQL shape by checking for node property
    const isGraphQL = rawItems.length > 0 && rawItems[0]?.node !== undefined;
    if (isGraphQL) return rawItems;
    // else assume minimal shape stored earlier
    return normalizeStoredItems(rawItems, currency);
  }

  // compute total in cents to avoid floating-point rounding issues
  function computeTotalFromItems(arr) {
    let centsSum = 0;
    for (const it of arr) {
      // support GraphQL-like shape
      const node = it?.node ?? it;
      let qty = Number(node?.quantity ?? node?.quantity ?? 0);
      // unit price can be at node.estimatedCost.totalAmount.amount or node.unitPrice
      let unit = Number(node?.estimatedCost?.totalAmount?.amount ?? node?.unitPrice ?? 0);
      if (isNaN(qty)) qty = 0;
      if (isNaN(unit)) unit = 0;
      const unitCents = Math.round(unit * 100);
      centsSum += unitCents * qty;
    }
    return centsSum / 100;
  }

  // convert current normalized items back into the minimal payload we store in localStorage
  function minimalPayloadFromNormalized(arr) {
    return arr.map((it) => {
      const node = it.node;
      return {
        lineId: node?.id ?? null,
        productId: node?.merchandise?.id ?? null,
        title: node?.merchandise?.product?.title ?? '',
        variantTitle: node?.merchandise?.title ?? '',
        quantity: Number(node?.quantity ?? 0),
        unitPrice: Number(node?.estimatedCost?.totalAmount?.amount ?? 0),
        image: node?.merchandise?.product?.images?.edges?.[0]?.node?.originalSrc ?? ''
      };
    });
  }

  function loadCartFromLocalStorage() {
    try {
      const raw = localStorage.getItem('cartData');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed) return null;
      return parsed;
    } catch (e) {
      console.warn('Invalid cartData in localStorage', e);
      return null;
    }
  }

  function updateLocalStorageFromNormalized() {
    try {
      const payloadItems = minimalPayloadFromNormalized(normalized);
      const totalVal = computeTotalFromItems(normalized);
      const cartData = {
        total: Number(totalVal.toFixed(2)),
        currency,
        items: payloadItems
      };
      localStorage.setItem('cartData', JSON.stringify(cartData));
    } catch (e) {
      console.error('Failed to update cartData in localStorage', e);
    }
  }

  // ensure normalized is kept in sync whenever parent passes new items prop
  $: if (items && items.length) {
    // don't overwrite a normalized state that came from localStorage if that is authoritative;
    // but if items look like GraphQL shape and localStorage is absent, use items.
    const ls = loadCartFromLocalStorage();
    if (!ls) {
      normalized = normalizeIncomingItems(items);
      currency = normalized[0]?.node?.estimatedCost?.totalAmount?.currencyCode ?? currency;
      formatter = makeFormatter(currency);
    }
  }

  // On mount: if localStorage has cartData, use it to populate normalized and override incoming items.
  onMount(() => {
    const cart = loadCartFromLocalStorage();
    if (cart && Array.isArray(cart.items) && cart.items.length) {
      currency = cart.currency ?? currency;
      formatter = makeFormatter(currency);
      normalized = normalizeStoredItems(cart.items, currency);
    } else {
      // fallback: normalize whatever items prop provided (if any)
      normalized = normalizeIncomingItems(items);
      currency = normalized[0]?.node?.estimatedCost?.totalAmount?.currencyCode ?? currency;
      formatter = makeFormatter(currency);
    }
    // keep escape handler
    window.addEventListener('keydown', handleKeyDown);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });

  async function addOneItem(item) {
    loading = true;
    try {
      await Promise.resolve(onAddProduct(item.node.merchandise.id));
      // optimistic local update: increment quantity in normalized and save
      const idx = normalized.findIndex(n => n.node.id === item.node.id);
      if (idx !== -1) {
        normalized[idx].node.quantity = Number(normalized[idx].node.quantity ?? 0) + 1;
        updateLocalStorageFromNormalized();
      }
    } catch (err) {
      console.error('addOneItem error', err);
    } finally {
      loading = false;
    }
  }

  async function removeOneItem(item) {
    loading = true;
    try {
      const quantity = Math.max(0, (item.node.quantity ?? 1) - 1);
      await Promise.resolve(onRemoveProduct(item.node.merchandise.id, quantity, item.node.id));
      // optimistic local update
      const idx = normalized.findIndex(n => n.node.id === item.node.id);
      if (idx !== -1) {
        normalized[idx].node.quantity = quantity;
        if (normalized[idx].node.quantity <= 0) {
          normalized.splice(idx, 1);
        }
        updateLocalStorageFromNormalized();
      }
    } catch (err) {
      console.error('removeOneItem error', err);
    } finally {
      loading = false;
    }
  }

  async function removeEntireItem(item) {
    loading = true;
    try {
      await Promise.resolve(onRemoveProduct(item.node.merchandise.id, 0, item.node.id));
      // optimistic local update: remove line
      const idx = normalized.findIndex(n => n.node.id === item.node.id);
      if (idx !== -1) {
        normalized.splice(idx, 1);
        updateLocalStorageFromNormalized();
      }
    } catch (err) {
      console.error('removeEntireItem error', err);
    } finally {
      loading = false;
    }
  }

  function closeCart() {
    if (typeof onClose === 'function') onClose();
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      closeCart();
    }
  }

  // compute total reactively from normalized items
  $: total = computeTotalFromItems(normalized);
  $: formattedTotal = formatter.format(total);

  // get currency code used
  function getCurrency() {
    return currency;
  }

  /**
   * Proceed to checkout:
   * - save current normalized minimal payload to localStorage under "cartData"
   * - navigate to /checkout with total & currency in query string
   */
  async function proceedToCheckout() {
    loading = true;
    try {
      updateLocalStorageFromNormalized();
      const cartData = loadCartFromLocalStorage();
      const url = `/checkout?total=${encodeURIComponent(cartData?.total ?? total.toFixed(2))}&currency=${encodeURIComponent(cartData?.currency ?? getCurrency())}`;
      goto(url);
    } catch (err) {
      console.error('proceedToCheckout error', err);
    } finally {
      loading = false;
    }
  }
</script>

<div
  class="absolute inset-0 z-50 flex max-h-screen w-full justify-end overflow-hidden bg-black/50"
  on:click={closeCart}
  role="dialog"
  aria-label="Shopping Cart"
  tabindex="0"
>
  <div class="z-50 w-full bg-black p-6 md:w-1/2 lg:w-1/3 relative" on:click|stopPropagation>
    {#if loading}
      <div class="absolute inset-0 bg-black/50 z-50"></div>
    {/if}

    <div class="mb-6 flex w-full items-center justify-between">
      <div class="text-2xl font-medium">My Cart</div>
      <button on:click={closeCart} class="text-sm uppercase opacity-80 hover:opacity-100">close</button>
    </div>

    {#if normalized.length === 0}
      <div class="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-white">
          <Icons type="cart" strokeColor="#000" />
        </div>
        <div class="mt-6 text-center text-2xl font-bold">Your cart is empty.</div>
      </div>
    {/if}

    <div class="overflow-y-auto" style="height: 70%;">
      {#each normalized as item (item.node.id)}
        <div class="mb-2 flex w-full">
          <img
            alt={item.node.merchandise.product.title}
            decoding="async"
            loading="lazy"
            class="w-20 flex-none bg-white"
            src={safeGetImage(item)}
          />
          <div class="ml-4 flex w-full flex-col justify-between">
            <div class="flex w-full justify-between">
              <div>
                <p class="text-lg font-medium">{item.node.merchandise.product.title}</p>
                <p class="text-sm">{item.node.merchandise.title}</p>
              </div>
              <p class="font-medium">
                {#if item.node.estimatedCost?.totalAmount?.amount != null}
                  {formatter.format(Number(item.node.estimatedCost.totalAmount.amount))}
                {:else}
                  —
                {/if}
              </p>
            </div>
          </div>
        </div>

        <div class="mb-4 flex w-full">
          <button
            on:click={() => removeEntireItem(item)}
            class="mr-2 flex h-8 w-8 items-center justify-center border border-white/40 bg-white/0 hover:bg-white/10"
            aria-label="Remove item"
          >
            <Icons type="close" strokeColor="#fff" />
          </button>
          <div class="flex h-8 w-full border border-white/40">
            <div class="flex h-full items-center px-2">
              {item.node.quantity}
            </div>
            <button
              on:click={() => removeOneItem(item)}
              class="ml-auto flex h-8 w-8 items-center justify-center border-l border-white/40 bg-white/0 hover:bg-white/10"
              aria-label="Decrease quantity"
            >
              <Icons type="minus" strokeColor="#fff" />
            </button>
            <button
              on:click={() => addOneItem(item)}
              class="flex h-8 w-8 items-center justify-center border-l border-white/40 bg-white/0 hover:bg-white/10"
              aria-label="Increase quantity"
            >
              <Icons type="plus" strokeColor="#fff" />
            </button>
          </div>
        </div>
      {/each}
    </div>

    {#if normalized.length !== 0}
      <div class="mt-4 text-right text-sm opacity-80">Subtotal: <strong>{formattedTotal}</strong></div>

      <button
        on:click={proceedToCheckout}
        class="mt-6 flex w-full items-center justify-center bg-white p-3 text-sm font-medium uppercase text-black opacity-90 hover:opacity-100"
        disabled={loading}
      >
        <span>Proceed to Checkout</span>
        {#if loading}
          <div class="lds-ring ml-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        {/if}
      </button>
    {/if}
  </div>
</div>

<style>
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    margin: 2px;
    border: 2px solid #000;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>