import { X as stringify, $ as head, W as ensure_array_like, S as pop, P as push } from "../../../../chunks/index.js";
import { G as GridTile } from "../../../../chunks/GridTile.js";
import { I as Icons } from "../../../../chunks/Icons.js";
import { a as attr } from "../../../../chunks/attributes.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function DescriptionToggle($$payload, $$props) {
  let { title, description } = $$props;
  $$payload.out += `<button class="flex w-full cursor-pointer border-b border-white/50 py-4 text-sm"><div${attr("class", `${stringify(`opacity-50 h-6 w-6 rotate ${""}`)} svelte-yb0al1`)}>`;
  Icons($$payload, { type: "caretRight", strokeColor: "#fff" });
  $$payload.out += `<!----></div> <div class="ml-4"><div class="mb-2">${escape_html(title)}</div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></button>`;
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  let selectedOptions = data?.body?.product?.options ? data.body.product.options.reduce((acc, option) => ({ ...acc, [option.name]: option.values[0] }), {}) : {};
  let currentImageIndex = 0;
  let highlightedImageSrc = data?.body?.product?.images?.edges[currentImageIndex]?.node?.originalSrc;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(data.body.product.title)}</title>`;
  });
  $$payload.out += `<div class="svelte-1qmsacc">`;
  if (data.body.product) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(data.body.product.images.edges);
    const each_array_1 = ensure_array_like(data.body.product.options);
    const each_array_3 = ensure_array_like(data.body.featuredProducts);
    $$payload.out += `<div class="flex flex-col md:flex-row svelte-1qmsacc"><div class="md:w-2/3 svelte-1qmsacc"><!---->`;
    {
      $$payload.out += `<div class="relative h-4/5 bg-light svelte-1qmsacc">`;
      GridTile($$payload, {
        title: data.body.product.title,
        price: data.body.product.priceRange.maxVariantPrice.amount,
        currencyCode: data.body.product.priceRange.maxVariantPrice.currencyCode,
        imageSrc: highlightedImageSrc
      });
      $$payload.out += `<!----> `;
      if (data.body.product?.images?.edges.length > 1) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="absolute right-0 bottom-0 z-40 p-6 svelte-1qmsacc"><button class="border border-b border-t border-l border-black py-4 px-8 svelte-1qmsacc" aria-label="Previous image">`;
        Icons($$payload, { type: "arrowLeft" });
        $$payload.out += `<!----></button> <button class="-ml-1 border border-black py-4 px-8 svelte-1qmsacc" aria-label="Next image">`;
        Icons($$payload, { type: "arrowRight" });
        $$payload.out += `<!----></button></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!----> <div class="flex h-1/5 svelte-1qmsacc"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let variant = each_array[i];
      $$payload.out += `<button class="h-full w-1/4 bg-white svelte-1qmsacc"${attr("aria-label", `View image ${i + 1}`)}>`;
      GridTile($$payload, {
        imageSrc: variant.node.originalSrc,
        removeLabels: true
      });
      $$payload.out += `<!----></button>`;
    }
    $$payload.out += `<!--]--></div></div> <div class="h-full p-6 md:w-1/3 svelte-1qmsacc"><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
      let option = each_array_1[$$index_2];
      const each_array_2 = ensure_array_like(option.values);
      $$payload.out += `<div class="mb-8 svelte-1qmsacc"><div class="mb-4 text-sm uppercase tracking-wide svelte-1qmsacc">${escape_html(option.name)}</div> <div class="flex svelte-1qmsacc"><!--[-->`;
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let value = each_array_2[$$index_1];
        $$payload.out += `<button${attr("class", `${stringify(`${value.length <= 3 ? "w-12" : "px-2"} ${selectedOptions[option.name] === value ? "opacity-100" : "opacity-60"} transition duration-300 ease-in-out hover:scale-110 hover:opacity-100 border-white h-12 mr-3 flex items-center justify-center rounded-full border cursor-pointer`)} svelte-1qmsacc`)}>${escape_html(value)}</button>`;
      }
      $$payload.out += `<!--]--></div></div>`;
    }
    $$payload.out += `<!--]--> <p class="text-sm svelte-1qmsacc">${escape_html(data.body.product.description)}</p> <div class="mt-8 flex items-center justify-between svelte-1qmsacc"><div class="flex items-center svelte-1qmsacc"><div class="mr-1 svelte-1qmsacc">`;
    Icons($$payload, { type: "star" });
    $$payload.out += `<!----></div> <div class="mr-1 svelte-1qmsacc">`;
    Icons($$payload, { type: "star" });
    $$payload.out += `<!----></div> <div class="mr-1 svelte-1qmsacc">`;
    Icons($$payload, { type: "star" });
    $$payload.out += `<!----></div> <div class="mr-1 svelte-1qmsacc">`;
    Icons($$payload, { type: "star" });
    $$payload.out += `<!----></div> <div class="mr-1 opacity-50 svelte-1qmsacc">`;
    Icons($$payload, { type: "star" });
    $$payload.out += `<!----></div></div> <div class="text-sm opacity-50 svelte-1qmsacc">36 Reviews</div></div> <button class="mt-6 cursor-pointer flex w-full items-center justify-center bg-light p-4 text-sm uppercase tracking-wide text-black opacity-90 hover:opacity-100 svelte-1qmsacc"><span class="svelte-1qmsacc">Add To Cart</span> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></button> `;
    DescriptionToggle($$payload, {
      title: "Care",
      description: "This is a limited edition production run. Printing starts when the drop ends."
    });
    $$payload.out += `<!----> `;
    DescriptionToggle($$payload, {
      title: "Details",
      description: "This is a limited edition production run. Printing starts when the drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due to COVID-19."
    });
    $$payload.out += `<!----></div></div> <div class="px-4 py-8 svelte-1qmsacc"><div class="mb-4 text-3xl font-bold svelte-1qmsacc">Related Products</div> <ul class="grid grid-flow-row grid-cols-2 gap-4 md:grid-cols-4 svelte-1qmsacc"><!--[-->`;
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let product = each_array_3[$$index_3];
      $$payload.out += `<li class="svelte-1qmsacc"><div class="group relative block aspect-square overflow-hidden border border-white/20 bg-zinc-800/50 svelte-1qmsacc">`;
      GridTile($$payload, {
        removeLabels: true,
        imageSrc: product.node.images.edges[0].node.originalSrc,
        href: `/product/${product.node.handle}`
      });
      $$payload.out += `<!----></div></li>`;
    }
    $$payload.out += `<!--]--></ul></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
