<script lang="ts">
  import { onMount } from 'svelte';
//   import { page } from '$app/stores';
  import { get } from 'svelte/store';

  let total = 5000.0; // replace with real total (or use data from load())
  let currency = 'KES';
  let phone = '';
  let loading = false;
  let error = '';

  onMount(() => {
    // If you use load() to pass total: const data = get(page).data; total = data.total;
  });

  async function payWithMpesa() {
    error = '';
    if (!phone || phone.length < 6) {
      error = 'Please enter a valid phone number.';
      return;
    }

    loading = true;
    try {
      const resp = await fetch('/dpo/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(total).toFixed(2),
          currency,
          phone,
          description: `Order payment - ${new Date().toISOString()}`
        })
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Server error: ${resp.status} - ${text}`);
      }

      const payload = await resp.json();
      if (!payload?.paymentUrl) throw new Error('Payment URL not returned by server.');

      window.open(payload.paymentUrl, '_blank');
    } catch (err: any) {
      console.error(err);
      error = err?.message ?? String(err);
    } finally {
      loading = false;
    }
  }
</script>

<section class="checkout-panel p-6 bg-black text-white min-h-screen">
  <div class="max-w-md mx-auto">
    <h1 class="text-2xl mb-4">Proceed to Checkout</h1>

    <div class="bg-[rgba(255,255,255,0.03)] p-4 rounded mb-4">
      <div class="flex justify-between items-center">
        <div>
          <div class="text-sm opacity-70">Total</div>
          <div class="text-xl font-semibold">{currency} {Number(total).toFixed(2)}</div>
        </div>
        <img src="/logo.png" alt="logo" class="w-12 h-12 object-contain" />
      </div>
    </div>

    <label class="block mb-2 text-sm opacity-80" for="">Phone (for M-Pesa STK)</label>
    <input
      class="w-full p-2 mb-4 bg-black border border-white/10 rounded"
      inputmode="tel"
      placeholder="+2547XXXXXXXX"
      bind:value={phone}
    />

    {#if error}
      <div class="mb-3 text-red-400 text-sm">{error}</div>
    {/if}

    <button
      class="w-full py-3 uppercase font-medium bg-white text-black rounded flex items-center justify-center"
      on:click={payWithMpesa}
      disabled={loading}
    >
      {#if loading}
        <span class="mr-3">Processing…</span>
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      {:else}
        Pay with M-Pesa
      {/if}
    </button>

    <div class="mt-6 text-xs opacity-60">
      Paying will open DPO’s secure page where the customer can choose M-Pesa. Use sandbox/test credentials first.
    </div>
  </div>
</section>

<style>
  .lds-ring { display:inline-block; position:relative; width:18px; height:18px; }
  .lds-ring div { box-sizing:border-box; display:block; position:absolute; width:14px; height:14px; margin:2px; border:2px solid #000; border-radius:50%; animation: lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite; border-color:#000 transparent transparent transparent; }
  .lds-ring div:nth-child(1){ animation-delay:-0.45s; } .lds-ring div:nth-child(2){ animation-delay:-0.3s;} .lds-ring div:nth-child(3){ animation-delay:-0.15s;}
  @keyframes lds-ring { 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) } }
</style>
