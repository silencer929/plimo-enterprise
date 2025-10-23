<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let total = 0;
  let currency = 'KES';
  let formattedTotal = '0.00';
  let items = []; // optional: read items from localStorage fallback

  // safe parse for query param amounts (accepts "123.45" or "123")
  function parseAmount(val) {
    if (!val) return 0;
    const n = Number(String(val).replace(/[, ]+/g, ''));
    return Number.isFinite(n) ? n : 0;
  }

  function formatAmount(value, curr) {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: curr, minimumFractionDigits: 2 }).format(Number(value));
    } catch (e) {
      return (Number(value) || 0).toFixed(2);
    }
  }

  function loadCartFromLocalStorage() {
    try {
      const raw = localStorage.getItem('cartData');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.items)) return parsed;
    } catch (e) {
      // ignore parse errors
    }
    return null;
  }

  onMount(() => {
    // 1) Try query params first
    const qs = get(page).url.searchParams;
    const qTotal = qs.get('total');
    const qCurrency = qs.get('currency');

    if (qTotal) {
      total = parseAmount(qTotal);
      currency = qCurrency ?? currency;
    } else {
      // 2) Fallback: read cartData from localStorage if present
      const cart = loadCartFromLocalStorage();
      if (cart) {
        // prefer computing from items if available
        if (Array.isArray(cart.items) && cart.items.length) {
          items = cart.items.map(i => ({ ...i, quantity: Number(i.quantity || 0), unitPrice: Number(i.unitPrice || 0) }));
          total = items.reduce((s, it) => s + (it.unitPrice || 0) * (it.quantity || 0), 0);
        } else if (cart.total != null) {
          total = Number(cart.total) || 0;
        }
        currency = cart.currency ?? currency;
      } else {
        // nothing: leave defaults or try to get from server-rendered data
        total = 0;
      }
    }

    formattedTotal = formatAmount(total, currency);
  });

  // If you prefer reactive formatting:
  $: formattedTotal = formatAmount(total, currency);

  // helper because we're using page store in onMount
  import { get } from 'svelte/store';
</script>

<section class="checkout">
  <h1>Checkout</h1>

  <div class="summary">
    <div>Total: <strong>{formattedTotal}</strong></div>
    <div class="small">Currency: {currency}</div>
  </div>

  {#if items.length}
    <ul>
      {#each items as it}
        <li>{it.title} — {it.variantTitle} × {it.quantity} @ {formatAmount(it.unitPrice, currency)}</li>
      {/each}
    </ul>
  {/if}

  <!-- Example: send to server using computed total -->
  <button on:click={async () => {
    // replace phone with actual collected phone
    const resp = await fetch('/dpo/create-transaction', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ amount: total.toFixed(2), currency, phone: '', description: 'Order payment' })
    });
    const json = await resp.json();
    console.log(json);
    if (json?.paymentUrl) window.open(json.paymentUrl, '_blank');
  }}>
    Pay {formattedTotal}
  </button>
</section>

<style>
  .checkout { padding: 1rem; color: #fff; background: #000; min-height: 60vh; }
  .summary { margin: 1rem 0; }
  .small { opacity: 0.7; font-size: .9rem; }
  button { background: #fff; color: #000; padding: .6rem 1rem; border: none; cursor: pointer; }
</style>