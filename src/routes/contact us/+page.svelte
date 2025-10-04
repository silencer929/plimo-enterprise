<script>
  // Contact page (client)
  // No prerender because page uses server endpoint
  export const prerender = false;

  import { onMount } from 'svelte';
  let name = '';
  let email = '';
  let subject = '';
  let message = '';
  let sending = false;
  let result = null; // { ok: boolean, message: string }

  // Replace with your real contact details / phone / address
  const STORE_NAME = 'Pleamore clothing and branding shop';
  const CONTACT_EMAIL = 'poweldayck@gmail.com';
  const PHONE = '+254 79614280';
  const ADDRESS = '123 Market St, Nairobi, Kenya';

  // Post the form to the server endpoint
  async function handleSubmit(ev) {
    ev.preventDefault();
    sending = true;
    result = null;

    const form = new FormData();
    form.set('name', name);
    form.set('email', email);
    form.set('subject', subject);
    form.set('message', message);

    try {
      const res = await fetch('/contact/submit', {
        method: 'POST',
        body: form,
        headers: { 'Accept': 'application/json' }
      });

      const data = await res.json();

      if (res.ok && data.success) {
        result = { ok: true, message: 'Thanks — your message has been sent. We will get back to you soon.' };
        // clear form
        name = email = subject = message = '';
      } else {
        result = { ok: false, message: data?.error || 'Something went wrong — please try again later.' };
      }
    } catch (err) {
      result = { ok: false, message: 'Network error. Please try again.' };
      console.error(err);
    } finally {
      sending = false;
    }
  }
</script>

<svelte:head>
  <title>Contact Us — {STORE_NAME}</title>
  <meta name="description" content="Contact {STORE_NAME} customer care via email. Location and opening hours included." />
</svelte:head>

<div class="min-h-screen bg-neutral-900 text-neutral-100">
  <main class="max-w-6xl mx-auto px-6 py-12">
    <h1 class="text-3xl md:text-4xl font-extrabold text-white">Contact customer care</h1>
    <p class="mt-2 text-neutral-300 max-w-2xl">
      Ask about products, orders, returns or collaborations. Choose email, or send a message below and we’ll respond within 24–48 hours.
    </p>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Form -->
      <section class="md:col-span-2 p-6 rounded-lg bg-neutral-800/50 border border-neutral-700">
        <h2 class="text-xl font-semibold text-white">Send us a message</h2>

        <form class="mt-4 space-y-4" on:submit|preventDefault={handleSubmit}>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="block">
              <span class="text-sm text-neutral-200">Your name</span>
              <input required bind:value={name} name="name" type="text" placeholder="Jane Doe"
                class="mt-1 w-full bg-neutral-900/40 border border-neutral-700 rounded-md px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
            </label>

            <label class="block">
              <span class="text-sm text-neutral-200">Email</span>
              <input required bind:value={email} name="email" type="email" placeholder="you@example.com"
                class="mt-1 w-full bg-neutral-900/40 border border-neutral-700 rounded-md px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
            </label>
          </div>

          <label class="block">
            <span class="text-sm text-neutral-200">Subject</span>
            <input bind:value={subject} name="subject" type="text" placeholder="How will my order be delivered"
              class="mt-1 w-full bg-neutral-900/40 border border-neutral-700 rounded-md px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
          </label>

          <label class="block">
            <span class="text-sm text-neutral-200">Message</span>
            <textarea required bind:value={message} name="message" rows="6" placeholder="Tell us about your question or issue..."
              class="mt-1 w-full bg-neutral-900/40 border border-neutral-700 rounded-md px-3 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"></textarea>
          </label>

          <div class="flex items-center gap-3">
            <button type="submit" class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md" disabled={sending}>
              {#if sending}
                <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" stroke-opacity="0.25" stroke-width="4"/><path d="M4 12a8 8 0 018-8" stroke="white" stroke-width="4" stroke-linecap="round"/></svg>
                Sending...
              {:else}
                Send message
              {/if}
            </button>

            <button type="button" class="text-sm text-neutral-300 underline" on:click={() => { name=''; email=''; subject=''; message=''; }}>
              Clear
            </button>
          </div>

          {#if result}
            <div class="mt-3 px-4 py-3 rounded-md">
              <p class="text-sm">{result.message}</p>
            </div>
          {/if}
        </form>
      </section>

      <!-- Contact details + map -->
      <aside class="p-6 rounded-lg bg-neutral-800/50 border border-neutral-700">
        <h3 class="text-lg font-semibold text-white">Contact details</h3>

        <div class="mt-4 space-y-3 text-sm text-neutral-300">
          <div>
            <strong class="text-neutral-100">Email</strong>
            <div><a class="text-emerald-300 hover:underline" href={"mailto:" + CONTACT_EMAIL}>{CONTACT_EMAIL}</a></div>
          </div>

          <div>
            <strong class="text-neutral-100">Phone</strong>
            <div><a class="text-emerald-300 hover:underline" href={"tel:" + PHONE}>{PHONE}</a></div>
          </div>

          <div>
            <strong class="text-neutral-100">Address</strong>
            <div class="text-neutral-300">{ADDRESS}</div>
          </div>
        </div>

        <div class="mt-4">
          <!-- Map embed (Google Maps "q" embed). Replace address / query as needed -->
          <div class="w-full aspect-[4/3] rounded-md overflow-hidden border border-neutral-700">
            <iframe
              src={"https://www.google.com/maps?q=" + encodeURIComponent(ADDRESS) + "&output=embed"}
              title="Location map"
              class="w-full h-full"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </aside>
    </div>
  </main>
</div>

<style>
  /* Local styles (no :global body override) — keep Tailwind for layout & colors */
</style>
