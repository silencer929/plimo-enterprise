import { d as getAllProducts } from "../../../chunks/shopify.js";
import { e as error } from "../../../chunks/index2.js";
async function load() {
  const res = await getAllProducts();
  if (res.status === 200) {
    const allProducts = res.body?.data.products;
    if (allProducts) {
      return {
        body: { allProducts }
      };
    }
    error(404);
  } else {
    error(res.status);
  }
}
export {
  load
};
