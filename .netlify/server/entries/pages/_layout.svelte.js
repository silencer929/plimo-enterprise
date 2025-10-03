import { T as store_get, V as unsubscribe_stores, S as pop, P as push, W as ensure_array_like, X as stringify, Y as copy_payload, Z as assign_payload } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
import { I as Icons } from "../../chunks/Icons.js";
import { w as writable } from "../../chunks/index3.js";
import { a as attr } from "../../chunks/attributes.js";
import { e as escape_html } from "../../chunks/escaping.js";
const cartQuantity = writable("");
function SearchBar($$payload, $$props) {
  push();
  var $$store_subs;
  let value = store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("q") || "";
  $$payload.out += `<form class="relative flex w-full items-center svelte-j8i540"><div class="absolute top-0 right-0 mr-2">`;
  Icons($$payload, { strokeColor: "#fff", type: "search" });
  $$payload.out += `<!----></div> <input id="searchInput" type="text"${attr("value", value)} placeholder="Search for products..." autocomplete="off" class="w-full border border-white/30 bg-transparent p-2 svelte-j8i540"></form>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Header($$payload, $$props) {
  push();
  var $$store_subs;
  let currentRoute = store_get($$store_subs ??= {}, "$page", page).url.pathname;
  let tabs = [
    { name: "All", path: "/search" },
    { name: "Featured", path: "/search/featured" },
    { name: "Apparel", path: "/search/clothes" }
  ];
  const each_array = ensure_array_like(tabs);
  $$payload.out += `<nav class="flex items-center border-b border-zinc-700 p-4 lg:px-6"><div class="flex w-1/3 items-center"><div${attr("class", `mr-4 ${stringify([currentRoute === "/" ? "active" : ""].filter(Boolean).join(" "))}`)}><a href="/" data-sveltekit-prefetch=""><picture><source srcset="/plimo-enterprise-shop-logo.png" type="image/png"> <img alt="Svelte Logo" class="h-[38] w-[32]" decoding="async"${attr("height", 38)} loading="eager" src="/svelte_logo.png"${attr("width", 32)}></picture></a></div> <div class="hidden lg:flex"><!--[-->`;
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let tab = each_array[i];
    $$payload.out += `<div${attr("class", [currentRoute === tab.path ? "active" : ""].filter(Boolean).join(" "))}><a data-sveltekit-prefetch=""${attr("href", tab.path)}${attr("class", `hover:opacity-100 px-2 py-1 text-white rounded-lg ${currentRoute === tab.path ? "opacity-100" : "opacity-75"}`)}>${escape_html(tab.name)}</a></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="hidden w-1/3 lg:block">`;
  SearchBar($$payload);
  $$payload.out += `<!----></div> <div class="ml-auto flex items-center"><button class="relative my-2 mx-4 cursor-pointer">`;
  Icons($$payload, { strokeColor: "#fff", type: "cart" });
  $$payload.out += `<!----> <div data-test="cart-quantity" class="absolute bottom-0 left-0 -ml-3 -mb-3 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white text-xs text-black">${escape_html(store_get($$store_subs ??= {}, "$cartQuantity", cartQuantity))}</div></button> <button aria-label="Open menu" class="lg:hidden cursor-pointer">`;
  Icons($$payload, { type: "menu" });
  $$payload.out += `<!----></button></div> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></nav>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Footer($$payload) {
  $$payload.out += `<div class="flex w-full flex-col items-center justify-center border-t border-zinc-700 py-8 px-4"><div class="flex items-center">Deployed on <a class="font-bold" href="https://vercel.com/home"><img src="/Vercel_Logo.png" alt="Vercel Logo" class="h-5 ml-1"></a></div></div>`;
}
function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<main${attr("class", `${"min-h-screen"} text-white overflow-hidden`)}>`;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    Header($$payload2);
    $$payload2.out += `<!----> <div class="min-h-screen overflow-scroll">`;
    children?.($$payload2);
    $$payload2.out += `<!----> `;
    Footer($$payload2);
    $$payload2.out += `<!----></div></main>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
export {
  _layout as default
};
