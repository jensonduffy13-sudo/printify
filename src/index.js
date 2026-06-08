import 'dotenv/config';
import { createClient } from './printifyClient.js';

const apiKey = process.env.PRINTIFY_API_KEY;

if (!apiKey) {
  console.error('Error: PRINTIFY_API_KEY not set in .env');
  process.exit(1);
}

const printify = createClient(apiKey);

async function main() {
  try {
    console.log('Connecting to Printify API...\n');

    const shops = await printify.getShops();
    console.log('\nShops:', JSON.stringify(shops, null, 2));

    if (shops.length > 0) {
      const shopId = shops[0].id;
      console.log(`\nFetching products for shop: ${shops[0].title} (${shopId})`);

      const products = await printify.getProducts(shopId);
      console.log(`\nProducts (${products.data?.length ?? 0} found):`);
      products.data?.forEach(p => console.log(` - [${p.id}] ${p.title}`));
    }
  } catch (err) {
    console.error('API Error:', err.response?.data ?? err.message);
  }
}

main();
