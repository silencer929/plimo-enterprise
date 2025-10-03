import { T as store_get, $ as head, W as ensure_array_like, V as unsubscribe_stores, S as pop, P as push } from "../../../../chunks/index.js";
import { G as GridTile } from "../../../../chunks/GridTile.js";
import { p as page } from "../../../../chunks/stores.js";
import { e as escape_html } from "../../../../chunks/escaping.js";
function _page($$payload, $$props) {
  push();
  var $$store_subs;
  let { data } = $$props;
  let collection = (() => {
    for (const d of data.body.collections) {
      if (d.node.handle === store_get($$store_subs ??= {}, "$page", page)?.params?.collection) {
        return d.node;
      }
    }
  })();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(collection?.handle)} collection</title>`;
  });
  $$payload.out += `<div>`;
  if (collection) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(collection.products.edges);
    $$payload.out += `<ul class="grid grid-flow-row gap-4 sm:grid-cols-2 md:grid-cols-3"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let product = each_array[i];
      $$payload.out += `<li><div class="group relative block aspect-square overflow-hidden bg-dark">`;
      GridTile($$payload, {
        href: `/product/${product?.node?.handle}`,
        title: product?.node?.title,
        price: product?.node?.priceRange?.maxVariantPrice?.amount,
        currencyCode: product?.node?.priceRange?.maxVariantPrice?.currencyCode,
        imageSrc: product?.node?.images?.edges[0].node?.originalSrc
      });
      $$payload.out += `<!----></div></li>`;
    }
    $$payload.out += `<!--]--></ul>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div>There are no products in this collection.</div>`;
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _page as default
};
