import { S as pop, P as push, W as ensure_array_like, $ as head } from "../../chunks/index.js";
import { G as GridTile } from "../../chunks/GridTile.js";
import { a as attr } from "../../chunks/attributes.js";
import { e as escape_html } from "../../chunks/escaping.js";
function ThreeItemGrid($$payload, $$props) {
  push();
  let { products } = $$props;
  $$payload.out += `<div class="flex flex-col lg:h-full lg:flex-row"><div class="h-[60vh] w-full bg-dark lg:h-full lg:w-2/3">`;
  GridTile($$payload, {
    priority: "eager",
    href: `/product/${products[0].node.handle}`,
    title: products[0].node.title,
    price: products[0].node.priceRange.maxVariantPrice.amount,
    currencyCode: products[0].node.priceRange.maxVariantPrice.currencyCode,
    imageSrc: products[0].node.images.edges[0].node.originalSrc
  });
  $$payload.out += `<!----></div> <div class="w-full lg:h-full lg:w-1/3"><div class="h-[60vh] w-full bg-light lg:h-1/2">`;
  GridTile($$payload, {
    priority: "eager",
    href: `/product/${products[1].node.handle}`,
    title: products[1].node.title,
    price: products[1].node.priceRange.maxVariantPrice.amount,
    currencyCode: products[1].node.priceRange.maxVariantPrice.currencyCode,
    imageSrc: products[1].node.images.edges[0].node.originalSrc
  });
  $$payload.out += `<!----></div> <div class="h-[60vh] w-full bg-svelteOrange lg:h-1/2">`;
  GridTile($$payload, {
    priority: "eager",
    href: `/product/${products[2].node.handle}`,
    title: products[2].node.title,
    price: products[2].node.priceRange.maxVariantPrice.amount,
    currencyCode: products[2].node.priceRange.maxVariantPrice.currencyCode,
    imageSrc: products[2].node.images.edges[0].node.originalSrc
  });
  $$payload.out += `<!----></div></div></div>`;
  pop();
}
function Carousel($$payload, $$props) {
  let { items = [] } = $$props;
  const each_array = ensure_array_like(items);
  $$payload.out += `<div class="slider relative w-full overflow-scroll bg-light svelte-1t9gynq"><div class="slide-track flex svelte-1t9gynq"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$payload.out += `<a data-sveltekit-prefetch=""${attr("href", `/product/${item.node.handle}`)} class="slide relative h-[40vh] flex-none md:w-1/3 svelte-1t9gynq"><img${attr("alt", item.node.title)} class="h-full svelte-1t9gynq" decoding="async" loading="lazy"${attr("src", item.node.images.edges[0].node.originalSrc)}> <div class="absolute top-0 left-0 z-40 mt-32 ml-44 bg-black p-4 svelte-1t9gynq">${escape_html(item.node.title)}</div></a>`;
  }
  $$payload.out += `<!--]--></div></div>`;
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let clothesCollection = data.products[0]?.node?.products?.edges;
  let featuredCollection = data.products[1]?.node?.products?.edges;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Home – Plimo Enterprise</title>`;
  });
  $$payload.out += `<main><section><div class="lg:h-[90vh]">`;
  ThreeItemGrid($$payload, { products: featuredCollection });
  $$payload.out += `<!----></div></section> <section>`;
  Carousel($$payload, { items: clothesCollection });
  $$payload.out += `<!----></section> <section><div class="flex flex-col px-8 py-20 text-white border border-black bg-dark lg:flex-row lg:items-center"><div class="flex-none mb-4 mr-8 text-3xl font-black text-left md:text-4xl lg:mb-0 lg:w-1/3 lg:text-right lg:text-6xl">Dessert dragée halvah croissant.</div> <div><div class="lg:text-2xl"></div> <button class="mt-4 font-bold text-svelteOrange hover:text-svelteDark lg:text-2xl">Read it here</button></div></div></section></main>`;
  pop();
}
export {
  _page as default
};
