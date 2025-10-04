<!-- File: src/routes/about/+page.svelte -->
<script>
  import { fade, fly } from 'svelte/transition';

  // prerender for static deploys
  export const prerender = true;

  // Customize store info
  const STORE_NAME = 'Pleamore clothing and branding shop';
  const CONTACT_EMAIL = 'poweldayck@gmail.com';
  const YEAR_STARTED = 2021;

  // HERO_IMAGE: put a file named '/about-hero.jpg' in your project's `static/` folder
  // or use an external URL (Unsplash example). Replace with your preferred image.
  const HERO_IMAGE = '/about-hero.jpg';
//   const HERO_IMAGE = 'https://images.unsplash.com/photo-1520975698510-31c95f5f4fbd?auto=format&fit=crop&w=1600&q=60';

  // team avatars (ui-avatars) — fine for placeholders
  const team = [
    {
      name: 'Amina Mwangi',
      role: 'Founder & CEO',
      bio: 'Design-driven founder focused on sustainable apparel.',
      avatar: `https://ui-avatars.com/api/?name=Amina+Mwangi&background=0f172a&color=ffffff&size=256`
    },
    {
      name: 'James Otieno',
      role: 'Head of Operations',
      bio: 'Keeps the supply chain nimble and ethical.',
      avatar: `https://ui-avatars.com/api/?name=James+Otieno&background=0f172a&color=ffffff&size=256`
    },
    {
      name: 'Lina K.',
      role: 'Creative Director',
      bio: 'Leads product design and seasonal collections.',
      avatar: `https://ui-avatars.com/api/?name=Lina+K&background=0f172a&color=ffffff&size=256`
    }
  ];
</script>

<svelte:head>
  <title>About — {STORE_NAME}</title>
  <meta name="description" content="Learn about {STORE_NAME}: our mission, vision, values and team behind the brand." />
</svelte:head>

<div class="min-h-screen bg-neutral-900 text-neutral-100">
  <!-- Hero -->
  <header class="relative w-full overflow-hidden">
    <!-- Background image as a cover div for perfect sizing -->
    <div
      class="w-full h-[420px] md:h-[520px] bg-center bg-cover bg-no-repeat"
      style="background-image: url('{HERO_IMAGE}');"
      aria-hidden="true"
      in:fade={{ duration: 600 }}
    >
      <!-- subtle dark overlay to ensure text contrast -->
      <div class="absolute inset-0 bg-black/55"></div>
    </div>

    <!-- Text block positioned at bottom-left with exact 10px margin -->
    <div
      class="absolute left-0 right-0 bottom-0 max-w-6xl mx-auto px-4 md:px-8"
      style="pointer-events: none;" >
      <div
        class="max-w-2xl translate-y-0"
        style="margin-left: 10px; margin-bottom: 10px; pointer-events: auto;"
        in:fly={{ y: 16, duration: 550 }}
        >
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
          {STORE_NAME}
        </h1>
        <p class="mt-3 text-sm md:text-lg text-neutral-200">
          Clothing crafted responsibly — built for life, styled for you.
        </p>
        <p class="mt-2 text-xs md:text-sm text-neutral-300">
          Since {YEAR_STARTED} — sustainable materials, transparent supply chains, and timeless design.
        </p>
      </div>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-6 pb-12">
    <!-- Who we are -->
    <section class="mt-10 md:mt-16">
      <h2 class="text-2xl font-semibold text-white">Who we are</h2>
      <p class="mt-3 text-neutral-300 max-w-3xl">
        {STORE_NAME} is a curated clothing store founded in {YEAR_STARTED} with a simple idea:
        to create timeless, comfortable garments that respect both people and the planet.
        We design thoughtfully, source responsibly, and focus on quality that outlives trends.
      </p>
    </section>

    <!-- Vision & Mission -->
    <section class="mt-8 grid gap-6 md:grid-cols-2">
      <div class="p-6 rounded-lg bg-neutral-800/60 border border-neutral-700">
        <h3 class="text-xl font-semibold text-white">Our Vision</h3>
        <p class="mt-3 text-neutral-300">
          To be a leading example of a fashion brand where sustainability and great design coexist —
          inspiring mindful consumption and long-lived wardrobes.
        </p>
      </div>

      <div class="p-6 rounded-lg bg-neutral-800/60 border border-neutral-700">
        <h3 class="text-xl font-semibold text-white">Our Mission</h3>
        <p class="mt-3 text-neutral-300">
          We create thoughtfully designed clothing using responsibly sourced materials and
          transparent supply chains — minimizing waste while supporting fair working conditions.
        </p>
      </div>
    </section>

    <!-- Core values -->
    <section class="mt-10">
      <h2 class="text-2xl font-semibold text-white">Core values</h2>
      <ul class="mt-4 grid gap-4 md:grid-cols-3">
        <li class="flex gap-4 items-start p-4 rounded-lg bg-neutral-800/60 border border-neutral-700">
          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-700/90 grid place-items-center text-white">✓</div>
          <div>
            <strong class="text-white">Quality first</strong>
            <p class="text-neutral-300 mt-1">Products built to last — we prioritize materials and construction over fast trends.</p>
          </div>
        </li>
        <li class="flex gap-4 items-start p-4 rounded-lg bg-neutral-800/60 border border-neutral-700">
          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-amber-600/90 grid place-items-center text-white">♻</div>
          <div>
            <strong class="text-white">Sustainability</strong>
            <p class="text-neutral-300 mt-1">Reduced waste, sustainable fibers, and responsible manufacturing are at our core.</p>
          </div>
        </li>
        <li class="flex gap-4 items-start p-4 rounded-lg bg-neutral-800/60 border border-neutral-700">
          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-sky-600/90 grid place-items-center text-white">♥</div>
          <div>
            <strong class="text-white">People matter</strong>
            <p class="text-neutral-300 mt-1">Fair pay and safe working conditions across our supply chain — always.</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- Team -->
    <section class="mt-12">
      <h2 class="text-2xl font-semibold text-white">Meet the team</h2>
      <div class="mt-6 grid gap-6 md:grid-cols-3">
        {#each team as member}
          <article class="flex flex-col items-start gap-3 p-6 rounded-lg bg-neutral-800/50 border border-neutral-700">
            <img src={member.avatar} alt={`Avatar of ${member.name}`} class="w-20 h-20 rounded-full object-cover border-2 border-neutral-700" loading="lazy" />
            <div class="mt-2">
              <h4 class="text-lg font-semibold text-white">{member.name}</h4>
              <p class="text-amber-300 text-sm mt-1">{member.role}</p>
              <p class="text-neutral-300 mt-2 text-sm">{member.bio}</p>
            </div>
          </article>
        {/each}
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="mt-12 p-6 rounded-lg bg-neutral-800/60 border border-neutral-700">
      <h3 class="text-lg font-semibold text-white">Want to know more?</h3>
      <p class="text-neutral-300 mt-2">We'd love to hear from you. Forward any product questions to our customer care team for an immediate response.</p>
      <p class="mt-4">
        <a href={"mailto:" + CONTACT_EMAIL} class="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md text-sm">
          Contact us
        </a>
      </p>
    </section>
  </main>
</div>
