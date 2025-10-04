<!-- File: src/components/Header.svelte -->
<script>
  import { page } from '$app/stores';
  import Icons from '$components/Icons.svelte';
  import SearchBar from '$components/SearchBar.svelte';
  import { cartQuantity } from '../store';
  import { tick, onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { fly } from 'svelte/transition';

  export let openCart = () => {};

  // reactive route
  $: currentRoute = $page.url.pathname;

  let showMenu = false;
  let firstFocusable; // element to focus when menu opens

  const tabs = [
    { name: 'Products', path: '/search' },
    { name: 'Featured', path: '/search/featured' },
    { name: 'About Us', path: '/about us'},
    { name: 'Contact US', path: '/contact us' }
  ];

  function onOpenCart() {
    showMenu = false;
    openCart();
  }

  function closeMenu() {
    showMenu = false;
  }

  // Only add window-level listeners in the browser
  onMount(() => {
    if (!browser) return;

    function handleKey(e) {
      if (e.key === 'Escape' && showMenu) {
        closeMenu();
      }
    }

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  });

  // Manage body scroll and focus when showMenu changes — guarded by `browser`
  $: if (browser) {
    if (showMenu) {
      // disable page scroll
      document.documentElement.style.overflow = 'hidden';

      // focus the close button after DOM update
      (async () => {
        await tick();
        try {
          firstFocusable?.focus?.();
        } catch (e) {
          // ignore focus errors
        }
      })();
    } else {
      // restore scroll
      document.documentElement.style.overflow = '';
    }
  }
</script>

<nav class="flex items-center border-b border-zinc-700 p-4 lg:px-6 relative">
  <div class="flex items-center space-x-4 w-1/3">
    <a href="/" class="flex items-center" data-sveltekit-prefetch>
      <img src="/plimo-enterprise-shop-logo.png" alt="Logo" class="h-10 w-auto" />
    </a>

    <div class="hidden lg:flex items-center space-x-2">
      {#each tabs as tab}
        <a
          href={tab.path}
          data-sveltekit-prefetch
          class="px-2 py-1 rounded-lg text-sm font-medium transition-opacity
                 {currentRoute === tab.path ? 'opacity-100 text-white' : 'opacity-75 text-white/80 hover:opacity-100'}"
          aria-current={currentRoute === tab.path ? 'page' : undefined}
        >
          {tab.name}
        </a>
      {/each}
    </div>
  </div>

  <div class="hidden w-1/3 lg:flex justify-center">
    <SearchBar />
  </div>

  <div class="ml-auto flex items-center space-x-3">
    <button type="button" on:click={onOpenCart} class="relative p-2 rounded-md">
      <Icons strokeColor="#fff" type="cart" />
      <span
        data-test="cart-quantity"
        class="absolute -bottom-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white text-xs text-black"
        aria-hidden="false"
      >{$cartQuantity}</span>
    </button>

    <button
      type="button"
      on:click={() => (showMenu = true)}
      aria-label="Open menu"
      class="lg:hidden p-2 rounded-md"
    >
      <Icons type="menu" />
    </button>
  </div>

  {#if showMenu}
    <!-- Backdrop: clicking closes the menu -->
    <div
      class="fixed inset-0 z-50 flex items-stretch justify-end bg-black/80 backdrop-blur-sm lg:hidden"
      on:click={closeMenu}
      aria-hidden="true"
    >
      <!-- Panel: stop propagation so clicks inside don't close -->
      <div
        class="relative z-60 w-full max-w-xs sm:max-w-sm md:max-w-md bg-neutral-900/95 border-l border-neutral-700 p-6 overflow-y-auto"
        on:click|stopPropagation
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        in:fly={{ x: 300, duration: 350 }}
      >
        <div class="flex items-center justify-between">
          <button
            type="button"
            aria-label="Close menu"
            on:click={closeMenu}
            class="p-2 rounded-md text-neutral-200 hover:text-white"
            bind:this={firstFocusable}
          >
            <Icons strokeColor="#fff" type="close" />
          </button>

          <button type="button" on:click={onOpenCart} class="relative p-2 rounded-md text-neutral-200 hover:text-white">
            <Icons strokeColor="#fff" type="cart" />
            <span class="absolute -bottom-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white text-xs text-black">{$cartQuantity}</span>
          </button>
        </div>

        <nav class="mt-6 flex flex-col gap-4" aria-label="Mobile primary">
          {#each tabs as tab}
            <a
              data-sveltekit-prefetch
              href={tab.path}
              on:click={() => { showMenu = false; }}
              class="block rounded-lg px-3 py-2 text-lg font-semibold text-white transition-colors hover:bg-neutral-800"
              aria-current={currentRoute === tab.path ? 'page' : undefined}
            >
              {tab.name}
            </a>
          {/each}
        </nav>

        <div class="mt-6 border-t border-neutral-800 pt-4 text-sm text-neutral-300">
          <div><strong class="text-neutral-100">Customer care</strong></div>
          <div class="mt-1">Email: <a href="mailto:poweldayck@gmail.com" class="text-emerald-400">poweldayck@gmail.com</a></div>
        </div>
      </div>
    </div>
  {/if}
</nav>

<style>
  /* no global styles here — Tailwind provides styling */
</style>
