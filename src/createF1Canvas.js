import 'dotenv/config';
import { createClient } from './printifyClient.js';

const printify = createClient(process.env.PRINTIFY_API_KEY);

const SHOP_ID = 27850555; // Printstud

// Canvas defaults
const BLUEPRINT_ID = 1159;
const PROVIDER_ID = 99;
const VARIANT_IDS = [91640, 91643, 91646, 91647, 91648, 91653]; // Vertical: 9x12, 12x16, 16x20, 16x24, 18x24, 24x36

const imageUrl = 'https://i.ibb.co/0R45Czky/Uniform-Black-Field-Representing-Total-Absence-Of-Light.png';

try {
  const uploaded = await printify.uploadImage({ file_name: 'f1-driver.png', url: imageUrl });
  console.log('Image uploaded:', uploaded.id);

  const product = {
    title: 'F1 Racing Driver Portrait | Formula 1 Wall Art Canvas Print | Motorsport Gift',
    description: 'A striking oil-style portrait canvas of a Formula 1 racing driver, capturing the intensity and passion of motorsport. Perfect for race fans, garage walls, home offices, and man caves.\n\nPrinted on premium matte stretched canvas with vivid, fade-resistant inks. Ready to hang straight out of the box.\n\n• Premium matte canvas, 1.25" deep stretcher bars\n• Ready to hang\n• Fade-resistant, high-quality print\n• Multiple sizes available',
    blueprint_id: BLUEPRINT_ID,
    print_provider_id: PROVIDER_ID,
    variants: VARIANT_IDS.map(id => ({ id, price: 2999, is_enabled: true })),
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
