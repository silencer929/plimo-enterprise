import { T as store_get, W as ensure_array_like, V as unsubscribe_stores, S as pop, P as push } from "../../../chunks/index.js";
import { G as GridTile } from "../../../chunks/GridTile.js";
import { p as page } from "../../../chunks/stores.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data } = $$props;
  let search = store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("q");
  let displayedProducts = search ? data.body.allProducts.edges.filter((item) => {
    return item.node.title.toLowerCase().includes(search.toLowerCase());
  }) : data.body.allProducts.edges;
  const each_array = ensure_array_like(displayedProducts);
  $$payload.out += `<div><ul class="grid grid-flow-row gap-4 sm:grid-cols-2 md:grid-cols-3">`;
  if (each_array.length !== 0) {
    $$payload.out += "<!--[-->";
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let product = each_array[i];
      $$payload.out += `<li><div class="group relative block aspect-square overflow-hidden bg-dark">`;
      GridTile($$payload, {
        title: product.node.title,
        href: `/product/${product.node.handle}`,
        price: product.node.priceRange.maxVariantPrice.amount,
        currencyCode: product.node.priceRange.maxVariantPrice.currencyCode,
        imageSrc: product.node.images.edges[0].node.originalSrc
      });
      $$payload.out += `<!----></div></li>`;
    }
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p>No products :(</p>`;
  }
  $$payload.out += `<!--]--></ul></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
