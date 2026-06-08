import 'dotenv/config';
import { createClient } from './printifyClient.js';

const printify = createClient(process.env.PRINTIFY_API_KEY);

// Vertical sizes: 9x12, 12x16, 16x20, 16x24, 18x24, 24x36
const variantIds = [91640, 91643, 91646, 91647, 91648, 91653];

const product = {
  title: 'Porsche Wall Art Canvas Print | Classic Sports Car Poster | Car Enthusiast Gift',
  description: 'A stunning high-quality matte canvas print featuring iconic Porsche design. Perfect for car enthusiasts, garage walls, home offices, and living spaces. Printed on premium stretched matte canvas with vivid, fade-resistant inks.\n\nPremium matte canvas with 1.25" deep stretcher bars. Ready to hang straight out of the box. Vibrant, fade-resistant print quality. Available in multiple sizes to suit any wall.',
  blueprint_id: 1159,
  print_provider_id: 99,
  variants: variantIds.map(id => ({ id, price: 2999, is_enabled: true })),
  print_areas: [{
    variant_ids: variantIds,
    placeholders: [{
      position: 'front',
      images: [{
        id: '6a2732c04d7786e356d4956a',
        x: 0.5,
        y: 0.5,
        scale: 1,
        angle: 0
      }]
    }]
  }]
};

try {
  const result = await printify.createProduct(27850555, product);
  console.log('Draft created:', result.id, '-', result.title);
} catch (err) {
  console.error('Error:', err.response?.data ?? err.message);
}
