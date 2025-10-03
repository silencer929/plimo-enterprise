import { T as store_get, V as unsubscribe_stores, S as pop, P as push } from "../../../chunks/index.js";
import { p as page } from "../../../chunks/stores.js";
import { a as attr } from "../../../chunks/attributes.js";
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  const { children } = $$props;
  $$payload.out += `<div class="flex"><nav class="col-span-2 hidden w-1/6 flex-none py-8 pl-6 lg:block"><h1 class="text-lg font-semibold">Categories</h1> <ul><li class="mt-2 text-sm text-gray-300"><a data-sveltekit-prefetch="" data-testid="category-link" class="whitespace-nowrap hover:underline focus:underline" href="/search"${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname === "/search" ? "page" : void 0)}>All</a></li> <li class="mt-2 text-sm text-gray-300"><a data-sveltekit-prefetch="" data-testid="category-link" class="whitespace-nowrap hover:underline focus:underline" href="/search/featured"${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname === "/search/featured" ? "page" : void 0)}>Featured</a></li> <li class="mt-2 text-sm text-gray-300"><a data-sveltekit-prefetch="" data-testid="category-link" class="whitespace-nowrap hover:underline focus:underline" href="/search/clothes"${attr("aria-current", store_get($$store_subs ??= {}, "$page", page).url.pathname === "/search/clothes" ? "page" : void 0)}>Apparel</a></li></ul></nav> <div class="min-h-screen">`;
  children($$payload);
  $$payload.out += `<!----></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _layout as default
};
