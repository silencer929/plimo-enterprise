import { c as createCart, u as updateCart, a as addToCart } from "../../../chunks/shopify.js";
import { e as error } from "../../../chunks/index2.js";
async function POST() {
  await createCart();
  return new Response({ data: {} });
}
async function PUT({ request }) {
  const body = await request.json();
  const response = await updateCart(body);
  if (response.status === 200) {
    return new Response({ data: response.body.data });
  } else {
    error(response.status);
  }
}
async function PATCH({ request }) {
  const body = await request.json();
  const response = await addToCart(body);
  if (response.status === 200) {
    return new Response({ data: response.body.data });
  } else {
    error(response.status);
  }
}
export {
  PATCH,
  POST,
  PUT
};
