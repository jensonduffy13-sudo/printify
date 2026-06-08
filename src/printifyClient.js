import axios from 'axios';

const BASE_URL = 'https://api.printify.com/v1';

export function createClient(apiKey) {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  return {
    // User
    getUser: () => client.get('/users/me.json').then(r => r.data),

    // Shops
    getShops: () => client.get('/shops.json').then(r => r.data),

    // Products
    getProducts: (shopId) =>
      client.get(`/shops/${shopId}/products.json`).then(r => r.data),

    getProduct: (shopId, productId) =>
      client.get(`/shops/${shopId}/products/${productId}.json`).then(r => r.data),

    createProduct: (shopId, data) =>
      client.post(`/shops/${shopId}/products.json`, data).then(r => r.data),

    updateProduct: (shopId, productId, data) =>
      client.put(`/shops/${shopId}/products/${productId}.json`, data).then(r => r.data),

    deleteProduct: (shopId, productId) =>
      client.delete(`/shops/${shopId}/products/${productId}.json`).then(r => r.data),

    publishProduct: (shopId, productId, data) =>
      client.post(`/shops/${shopId}/products/${productId}/publish.json`, data).then(r => r.data),

    // Orders
    getOrders: (shopId) =>
      client.get(`/shops/${shopId}/orders.json`).then(r => r.data),

    getOrder: (shopId, orderId) =>
      client.get(`/shops/${shopId}/orders/${orderId}.json`).then(r => r.data),

    // Catalog
    getCatalogBlueprints: () =>
      client.get('/catalog/blueprints.json').then(r => r.data),

    getBlueprintProviders: (blueprintId) =>
      client.get(`/catalog/blueprints/${blueprintId}/print_providers.json`).then(r => r.data),

    getBlueprintVariants: (blueprintId, providerId) =>
      client.get(`/catalog/blueprints/${blueprintId}/print_providers/${providerId}/variants.json`).then(r => r.data),

    // Uploads
    getUploads: (shopId) =>
      client.get(`/uploads.json`).then(r => r.data),

    uploadImage: (data) =>
      client.post('/uploads/images.json', data).then(r => r.data),

    // Webhooks
    getWebhooks: (shopId) =>
      client.get(`/shops/${shopId}/webhooks.json`).then(r => r.data),

    createWebhook: (shopId, data) =>
      client.post(`/shops/${shopId}/webhooks.json`, data).then(r => r.data),
  };
}
