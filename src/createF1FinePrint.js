import 'dotenv/config';
import { createClient } from './printifyClient.js';

const printify = createClient(process.env.PRINTIFY_API_KEY);

const SHOP_ID = 27850555; // Printstud
const BLUEPRINT_ID = 804;  // Fine Art Posters
const PROVIDER_ID = 72;    // Print Clever

// Most popular vertical fine art print sizes
const VARIANT_IDS = [
  75288, // 8x10
  75290, // 12x16
  75292, // 16x20
  100938, // 18x24
  75296, // 24x36
  155652  // 30x40
];

const imageUrl = 'https://i.ibb.co/0R45Czky/Uniform-Black-Field-Representing-Total-Absence-Of-Light.png';

try {
  const uploaded = await printify.uploadImage({ file_name: 'f1-driver.png', url: imageUrl });
  console.log('Image uploaded:', uploaded.id);

  const product = {
    title: 'F1 Racing Driver Portrait | Formula 1 Fine Art Print | Motorsport Wall Art | Race Fan Gift',
    description: 'A stunning oil-painted style portrait of a Formula 1 racing driver — capturing the raw focus and passion of motorsport. A must-have for any racing fan, garage wall, home office, or man cave.\n\nPrinted on premium fine art matte paper with archival-quality, fade-resistant inks for a gallery-worthy finish.\n\n• Premium fine art matte paper\n• Vivid, fade-resistant archival inks\n• Ships rolled in a protective tube\n• Available in multiple sizes\n• Ready to frame',
    blueprint_id: BLUEPRINT_ID,
    print_provider_id: PROVIDER_ID,
    variants: VARIANT_IDS.map(id => ({ id, price: 1999, is_enabled: true })),
    print_areas: [{
      variant_ids: VARIANT_IDS,
      placeholders: [{
        position: 'front',
        images: [{
          id: uploaded.id,
          x: 0.5, y: 0.5, scale: 1, angle: 0
        }]
      }]
    }]
  };

  const result = await printify.createProduct(SHOP_ID, product);
  console.log('Draft created:', result.id, '-', result.title);
} catch (err) {
  console.error('Error:', err.response?.data ?? err.message);
}
