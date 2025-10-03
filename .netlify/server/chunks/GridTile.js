import { a as attr } from "./attributes.js";
import { e as escape_html } from "./escaping.js";
function GridTile($$payload, $$props) {
  let {
    title = "",
    removeLabels = false,
    imageSrc,
    price = "",
    currencyCode = "",
    href = "",
    priority = "lazy"
  } = $$props;
  $$payload.out += `<div class="h-full w-full overflow-hidden" role="img"${attr("aria-label", title)}><a data-test="grid-tile"${attr("href", href)} data-sveltekit-prefetch="" class="focus:border-blue-500 focus:border-2 relative flex h-full w-full items-center justify-center"><img${attr("alt", title)}${attr("class", `w-full md:w-1/2 lg:w-full flex-none transition duration-300 ease-in-out ${""}`)}${attr("fetchpriority", priority === "eager" ? "high" : "low")} decoding="async"${attr("loading", priority)}${attr("src", imageSrc)}> `;
  if (!removeLabels) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="absolute top-0 left-0"><div class="bg-black p-3 text-2xl font-medium">${escape_html(title)}</div> <div class="w-fit bg-black p-3 text-sm">$${escape_html(price)}
          ${escape_html(currencyCode)}</div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></a></div>`;
}
export {
  GridTile as G
};
