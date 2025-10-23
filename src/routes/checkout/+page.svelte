<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';

  // UI state
  let total = 0;
  let currency = 'KES';
  let formattedTotal = 'KES 0.00';
  let items = [];

  // payment / phone state
  let country = 'KE'; // default
  let countryCode = '+254';
  let phoneLocal = ''; // user-entered local part (no leading zero ideally)
  let loading = false;
  let error = '';

  // simple country list (add more if you like)
  const countries = [
    { code: 'KE', name: 'Kenya', dial: '+254', flag: '🇰🇪', example: '712345678' },
    { code: 'TZ', name: 'Tanzania', dial: '+255', flag: '🇹🇿', example: '712345678' },
    { code: 'UG', name: 'Uganda', dial: '+256', flag: '🇺🇬', example: '712345678' },
    { code: 'RW', name: 'Rwanda', dial: '+250', flag: '🇷🇼', example: '712345678' },
    { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦', example: '712345678' },
    { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬', example: '8123456789' },
    { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧', example: '7123456789' },
    { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸', example: '5551234567' }
  ];

  // read cartData from localStorage (fallback to query params)
  function loadCartFromLocalStorage() {
    try {
      const raw = localStorage.getItem('cartData');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.items)) return parsed;
    } catch (e) {
      // ignore
    }
    return null;
  }

  function parseAmount(val) {
    if (!val) return 0;
    const n = Number(String(val).replace(/[, ]+/g, ''));
    return Number.isFinite(n) ? n : 0;
  }

  function formatAmount(value, curr) {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: curr, minimumFractionDigits: 2 }).format(Number(value));
    } catch (e) {
      return `${curr} ${(Number(value) || 0).toFixed(2)}`;
    }
  }

  onMount(() => {
    // 1) attempt query params
    const qs = get(page).url.searchParams;
    const qTotal = qs.get('total');
    const qCurrency = qs.get('currency');
    if (qTotal) {
      total = parseAmount(qTotal);
      currency = qCurrency ?? currency;
    } else {
      // 2) fallback to localStorage
      const cart = loadCartFromLocalStorage();
      if (cart) {
        currency = cart.currency ?? currency;
        if (Array.isArray(cart.items) && cart.items.length) {
          items = cart.items.map(i => ({ ...i, quantity: Number(i.quantity || 0), unitPrice: Number(i.unitPrice || 0) }));
          total = items.reduce((s, it) => s + (it.unitPrice || 0) * (it.quantity || 0), 0);
        } else if (cart.total != null) {
          total = Number(cart.total) || 0;
        }
      }
    }

    formattedTotal = formatAmount(total, currency);
  });

  // when user changes country select, update countryCode
  function onSelectCountry(code) {
    country = code;
    const c = countries.find(c => c.code === code);
    countryCode = c?.dial ?? '+254';
  }

  // build international phone string
  function buildPhone() {
    const local = String(phoneLocal || '').trim();
    // if user included leading zero, strip it for many mobile formats
    const stripped = local.replace(/^0+/, '');
    // ensure it begins with + and dial code
    return `${countryCode}${stripped}`;
  }

  async function payWithMpesa() {
    error = '';
    const phone = buildPhone();

    // rudimentary validation
    if (!phoneLocal || phoneLocal.length < 6) {
      error = 'Please enter your phone number (local part).';
      return;
    }
    if (!/^\+\d{6,15}$/.test(phone)) {
      error = 'Phone number looks invalid. Make sure you selected the correct country code and entered the local number without spaces.';
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

      // open DPO payment page in a new tab
      window.open(payload.paymentUrl, '_blank');
    } catch (err) {
      console.error(err);
      error = err?.message ?? String(err);
    } finally {
      loading = false;
    }
  }
</script>

<!-- Centered dark checkout card using Tailwind -->
<div class="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center px-4 py-12">
  <div class="w-full max-w-2xl bg-black/70 backdrop-blur-md border border-white/6 rounded-2xl shadow-2xl overflow-hidden">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <!-- Left: Visual / DPO brand -->
      <div class="p-8 flex flex-col items-center justify-center gap-4 bg-[linear-gradient(135deg,#0f172a,transparent)]">
        <img src="/dpo-logo.png" alt="DPO Payments" class="w-36 h-auto object-contain drop-shadow-lg" />
        <h2 class="text-white text-2xl font-semibold mt-2">Secure Payments</h2>
        <p class="text-sm text-gray-300 text-center max-w-xs">
          Powered by DPO Group — customers will receive a secure payment prompt (including M-Pesa STK push where available).
        </p>

        <div class="mt-4 w-full">
          <dl class="text-sm text-gray-300">
            <div class="flex justify-between py-1">
              <dt class="opacity-80">Items</dt>
              <dd>{items.length}</dd>
            </div>
            <div class="flex justify-between py-1">
              <dt class="opacity-80">Currency</dt>
              <dd>{currency}</dd>
            </div>
            <div class="flex justify-between py-1">
              <dt class="opacity-80">Total</dt>
              <dd class="text-lg font-semibold">{formattedTotal}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="p-8">
        <div class="flex flex-col items-center">
          <h3 class="text-white text-xl font-bold mb-2">Pay with M-Pesa (via DPO)</h3>
          <p class="text-sm text-gray-400 mb-6 text-center">Enter the phone number that will receive the STK push. Select your country code first.</p>

          <!-- form card -->
          <div class="w-full bg-white/5 p-5 rounded-xl border border-white/6">
            <!-- country + phone row -->
            <label class="block text-xs text-gray-300 mb-2">Country</label>
            <div class="flex gap-3 mb-4">
              <select
                aria-label="Select country"
                class="flex-1 bg-black/50 text-white p-3 rounded-md border border-white/10 focus:ring-2 focus:ring-indigo-500"
                bind:value={country}
                on:change={() => onSelectCountry(country)}
              >
                {#each countries as c}
                  <option value={c.code}>{c.flag} {c.name} ({c.dial})</option>
                {/each}
              </select>

              <div class="w-32">
                <input
                  readonly
                  class="w-full p-3 rounded-md bg-black/60 text-white border border-white/10"
                  value={countryCode}
                  aria-hidden="true"
                />
              </div>
            </div>

            <label class="block text-xs text-gray-300 mb-2">Phone number (local part)</label>
            <div class="flex items-center gap-3 mb-2">
              <span class="inline-flex items-center justify-center px-3 py-2 rounded-l-md bg-white/3 text-sm text-gray-200 border border-r-0 border-white/10">
                {countryCode}
              </span>
              <input
                inputmode="tel"
                placeholder={countries.find(c => c.code === country)?.example ?? '712345678'}
                bind:value={phoneLocal}
                class="flex-1 p-3 rounded-r-md bg-black/60 text-white border border-white/10 focus:ring-2 focus:ring-indigo-500"
                aria-label="Local phone number"
              />
            </div>

            <p class="text-xs text-gray-400 mb-4">Example: enter the local number without the leading zero (e.g. for +254 712 345678 enter <span class="font-medium">712345678</span>).</p>

            {#if error}
              <div class="text-sm text-red-400 mb-3">{error}</div>
            {/if}

            <button
              class="w-full flex items-center justify-center gap-3 py-3 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow hover:scale-[1.01] active:scale-[0.995] transition-transform disabled:opacity-60"
              on:click={payWithMpesa}
              disabled={loading}
            >
              {#if loading}
                <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"></path>
                </svg>
                Processing…
              {:else}
                Pay {formattedTotal}
              {/if}
            </button>

            <div class="mt-4 text-xs text-gray-400">
              By clicking Pay you will be redirected to DPO's secure payment page. Keep your phone nearby to accept the STK push.
            </div>
          </div>

          <!-- small footer -->
          <div class="mt-6 text-center text-xs text-gray-500">
            <span>Questions? </span>
            <a class="text-indigo-400 underline" href="/support">Contact support</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* extra subtle focus ring for keyboard users */
  select:focus, input:focus, button:focus { outline: none; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
</style>