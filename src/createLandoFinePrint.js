import 'dotenv/config';
import { createClient } from './printifyClient.js';

const printify = createClient(process.env.PRINTIFY_API_KEY);

const SHOP_ID = 27850555;
const BLUEPRINT_ID = 804;
const PROVIDER_ID = 72;
const VARIANT_IDS = [75288, 75290, 75292, 100938, 75296, 155652];

const imageUrl = 'https://i.ibb.co/nNddNGJz/Dynamic-Portrait-Of-Lando-Norris-In-Mc-Laren-Suit.png';

try {
  const uploaded = await printify.uploadImage({ file_name: 'lando-norris.png', url: imageUrl });
  console.log('Image uploaded:', uploaded.id);

  const product = {
    title: 'Lando Norris McLaren F1 Fine Art Print | Formula 1 Wall Art | Motorsport Poster | Race Fan Gift',
    description: 'A dynamic portrait of Lando Norris in his iconic McLaren race suit, combining photorealistic detail with a bold watercolour splash effect. Perfect for any F1 fan, bedroom wall, home office, or garage.\n\nPrinted on premium fine art matte paper with archival-quality, fade-resistant inks for a gallery-worthy finish.\n\n• Premium fine art matte paper\n• Vivid, fade-resistant archival inks\n• Ships rolled in a protective tube\n• Available in multiple sizes\n• Ready to frame',
    blueprint_id: BLUEPRINT_ID,
    print_provider_id: PROVIDER_ID,
    variants: VARIANT_IDS.map(id => ({ id, price: 1999, is_enabled: true })),
    print_areas: [{
      variant_ids: VARIANT_IDS,
      placeholders: [{
        position: 'front',
        images: [{ id: uploaded.id, x: 0.5, y: 0.5, scale: 1, angle: 0 }]
      }]
    }]
  };

  const result = await printify.createProduct(SHOP_ID, product);
  console.log('Draft created:', result.id, '-', result.title);
} catch (err) {
  console.error('Error:', err.response?.data ?? err.message);
}
