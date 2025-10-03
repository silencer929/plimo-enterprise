import { g as getAllCollections } from "../../chunks/shopify.js";
import { e as error } from "../../chunks/index2.js";
async function load({ url }) {
  const res = await getAllCollections();
  if (res.status === 200) {
    const products = res.body?.data?.collections?.edges;
    if (products) {
      return { products };
    }
    error(404);
  } else {
    error(res.status);
  }
}
export {
  load
};
