import 'dotenv/config';
import { createClient } from './printifyClient.js';

const printify = createClient(process.env.PRINTIFY_API_KEY);

const SHOP_ID = 27850555;
const BLUEPRINT_ID = 804;
const PROVIDER_ID = 72;
const VARIANT_IDS = [75288, 75290, 75292, 100938, 75296, 155652];

const imageUrl = 'https://i.ibb.co/9HR34q3q/Vibrant-Art-Deco-Travel-Poster-Featuring-California-Golf-Course-Sunset.png';

try {
  const uploaded = await printify.uploadImage({ file_name: 'california-golf-sunset.png', url: imageUrl });
  console.log('Image uploaded:', uploaded.id);

  const product = {
    title: 'California Golf Course Sunset Art Deco Print | Vintage Golf Wall Art | Golf Gift For Him | Travel Poster Style',
    description: 'A vibrant Art Deco-inspired travel poster featuring a stunning California golf course at sunset — bold colours, retro style, and timeless elegance. Perfect for golf lovers, home offices, clubhouses, and living spaces.\n\nPrinted on premium fine art matte paper with archival-quality, fade-resistant inks for a gallery-worthy finish.\n\n• Premium fine art matte paper\n• Vivid, fade-resistant archival inks\n• Ships rolled in a protective tube\n• Available in multiple sizes\n• Ready to frame',
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
