import { g as getAllCollections } from "../../../../chunks/shopify.js";
import { e as error } from "../../../../chunks/index2.js";
async function load() {
  const res = await getAllCollections();
  if (res.status === 200) {
    const collections = res.body?.data?.collections?.edges || [];
    if (collections) {
      return {
        body: { collections }
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
