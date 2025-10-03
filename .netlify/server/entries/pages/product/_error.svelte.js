import { T as store_get, V as unsubscribe_stores, S as pop, P as push } from "../../../chunks/index.js";
import { p as page } from "../../../chunks/stores.js";
import { e as escape_html } from "../../../chunks/escaping.js";
function _error($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<h1>${escape_html(store_get($$store_subs ??= {}, "$page", page).status)} : ${escape_html(store_get($$store_subs ??= {}, "$page", page).error.message)}</h1>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _error as default
};
