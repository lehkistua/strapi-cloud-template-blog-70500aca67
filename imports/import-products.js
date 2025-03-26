const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');

const STRAPI_API_URL = 'http://localhost:1337/api';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

const importProducts = async () => {
  const products = [];

  fs.createReadStream('imports/products.csv')
    .pipe(csv())
    .on('data', (row) => {
      products.push({
        title: row.title,
        shortDescription: row.shortDescription,
        price: parseFloat(row.price),
        stock: parseInt(row.stock),
        categories: row.categories.split(',').map(id => parseInt(id)),
        tags: row.tags.split(',').map(id => parseInt(id)),
      });
    })
    .on('end', async () => {
      for (const product of products) {
        await axios.post(
          `${STRAPI_API_URL}/products`,
          { data: product },
          { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
        );
      }
      console.log('Товари успішно імпортовано!');
    });
};

importProducts();