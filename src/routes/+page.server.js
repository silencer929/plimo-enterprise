import { getAllCollections } from '$utils/shopify';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function load({ url }) {
  const res = await getAllCollections();

  if (res.status === 200) {
    const products = res.body?.data?.collections?.edges;

    if (products && products.length > 0) {
      return { products };
    }

    // Redirect to /search if no products found
    throw redirect(302, '/search');
  } else {
    throw error(res.status, 'Failed to load collections');
  }
}
