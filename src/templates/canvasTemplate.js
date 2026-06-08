import 'dotenv/config';
import { createClient } from '../printifyClient.js';

const printify = createClient(process.env.PRINTIFY_API_KEY);

const SHOP_ID = 27850555; // Printstud

// Orientation options - uncomment the one you need:

// VERTICAL sizes
const variantIds = [91640, 91643, 91646, 91647, 91648, 91653];
// 9x12, 12x16, 16x20, 16x24, 18x24, 24x36

// HORIZONTAL sizes
// const variantIds = [91624, 91626, 91629, 91630, 91633, 91635];
// 12x9, 16x12, 20x16, 24x16, 30x20, 36x24

const product = {
  title: 'PRODUCT TITLE HERE',
  description: 'PRODUCT DESCRIPTION HERE',
  blueprint_id: 1159,       // Matte Canvas, Stretched, 1.25"
  print_provider_id: 99,    // Printify Choice
  variants: variantIds.map(id => ({ id, price: 2999, is_enabled: true })),
  print_areas: [{
    variant_ids: variantIds,
    placeholders: [{
      position: 'front',
      images: [{
        id: 'UPLOAD_IMAGE_ID_HERE',
        x: 0.5,
        y: 0.5,
        scale: 1,
        angle: 0
      }]
    }]
  }]
};

try {
  const result = await printify.createProduct(SHOP_ID, product);
  console.log('Draft created:', result.id, '-', result.title);
} catch (err) {
  console.error('Error:', err.response?.data ?? err.message);
}
