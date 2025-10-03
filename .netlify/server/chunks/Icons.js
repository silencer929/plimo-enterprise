import { a as attr } from "./attributes.js";
function Icons($$payload, $$props) {
  let {
    strokeColor = "#000",
    type,
    width = "24px;",
    height = "24px;"
  } = $$props;
  $$payload.out += `<div>`;
  if (type === "star") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.43 8L10 0L7.57 8H0L6.18 12.41L3.83 20L10 15.31L16.18 20L13.83 12.41L20 8H12.43Z"></path></svg>`;
  } else {
    $$payload.out += "<!--[!-->";
    if (type === "cart") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<svg width="20" height="22" viewBox="0 0 20 22" fill="none"${attr("stroke", strokeColor)}><path d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 5H19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
    } else {
      $$payload.out += "<!--[!-->";
      if (type === "close") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<svg viewBox="0 0 24 24" width="24" height="24"${attr("stroke", strokeColor)} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" shape-rendering="geometricPrecision" class="hover:text-accent-3 h-6 w-6"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>`;
      } else {
        $$payload.out += "<!--[!-->";
        if (type === "minus") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12H19"${attr("stroke", strokeColor)} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
        } else {
          $$payload.out += "<!--[!-->";
          if (type === "plus") {
            $$payload.out += "<!--[-->";
            $$payload.out += `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5V19"${attr("stroke", strokeColor)} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 12H19"${attr("stroke", strokeColor)} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
          } else {
            $$payload.out += "<!--[!-->";
            if (type === "menu") {
              $$payload.out += "<!--[-->";
              $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#fff"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
            } else {
              $$payload.out += "<!--[!-->";
              if (type === "search") {
                $$payload.out += "<!--[-->";
                $$payload.out += `<svg${attr("style", `width:${width};height:${height}`)} viewBox="0 0 24 24"><path${attr("fill", strokeColor)} d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path></svg>`;
              } else {
                $$payload.out += "<!--[!-->";
                if (type === "arrowLeft") {
                  $$payload.out += "<!--[-->";
                  $$payload.out += `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"${attr("stroke", strokeColor)}><path d="M19 12H5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 19L5 12L12 5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
                } else {
                  $$payload.out += "<!--[!-->";
                  if (type === "arrowRight") {
                    $$payload.out += "<!--[-->";
                    $$payload.out += `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"${attr("stroke", strokeColor)} xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 5L19 12L12 19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
                  } else {
                    $$payload.out += "<!--[!-->";
                    if (type === "caretRight") {
                      $$payload.out += "<!--[-->";
                      $$payload.out += `<svg viewBox="0 0 24 24" width="24" height="24"${attr("stroke", strokeColor)} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" shape-rendering="geometricPrecision" class="Collapse_icon__JsuEg"><path d="M9 18l6-6-6-6"></path></svg>`;
                    } else {
                      $$payload.out += "<!--[!-->";
                    }
                    $$payload.out += `<!--]-->`;
                  }
                  $$payload.out += `<!--]-->`;
                }
                $$payload.out += `<!--]-->`;
              }
              $$payload.out += `<!--]-->`;
            }
            $$payload.out += `<!--]-->`;
          }
          $$payload.out += `<!--]-->`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div>`;
}
export {
  Icons as I
};
