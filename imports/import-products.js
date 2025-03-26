const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');
require('dotenv').config(); // Додаємо для зчитування змінних із .env

// Налаштування API
const STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337/api';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

// Перевірка наявності токена
if (!STRAPI_TOKEN) {
  console.error('Помилка: STRAPI_TOKEN не вказаний у .env файлі');
  process.exit(1);
}

// Функція для генерації slug із title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Замінюємо всі неалфавітно-цифрові символи на дефіс
    .replace(/-+/g, '-') // Замінюємо кілька дефісів на один
    .replace(/^-|-$/g, ''); // Прибираємо дефіси на початку і в кінці
};

const importProducts = async () => {
  const products = [];

  // Читання CSV-файлу
  fs.createReadStream('imports/products.csv')
    .pipe(csv())
    .on('headers', (headers) => {
      console.log('Заголовки CSV:', headers); // Для діагностики
    })
    .on('data', (row) => {
      // Перевірка, чи є значення для 'Title'
      if (!row['Title']) {
        console.error('Помилка: відсутнє значення для колонки "Title" у рядку:', row);
        return; // Пропускаємо цей рядок
      }

      // Об’єднуємо два поля Description і Volume у description
      const description = `
        <h3>Опис продукту</h3>
        <p>${row['shortDescription'] || ''}</p>
        <h3>Як вживати</h3>
        <p>${row['Description'] || ''}</p>
        <h3>Взаємодія з іншими продуктами</h3>
        <p>${row['Description_1'] || ''}</p>
        <h3>Об’єм</h3>
        <p>${row['Volume'] || ''}</p>
      `.trim();

      const product = {
        title: row['Title'],
        shortDescription: row['shortDescription'] || '',
        description: description,
        price: parseFloat(row['Price']) || 0,
        stock: 0, // В CSV немає stock, встановлюємо 0
        sku: row['SKU'] || '',
        slug: generateSlug(row['Title']),
        categories: [], // У CSV немає категорій, залишаємо порожнім
        tags: [], // У CSV немає тегів, залишаємо порожнім
        mainImage: null,
        images: [],
        variations: [],
        seo: null,
      };

      products.push(product);
    })
    .on('end', async () => {
      console.log(`Знайдено ${products.length} товарів для імпорту.`);

      for (const product of products) {
        try {
          const response = await axios.post(
            `${STRAPI_API_URL}/products`,
            { data: product },
            {
              headers: {
                Authorization: `Bearer ${STRAPI_TOKEN}`,
                'Content-Type': 'application/json',
              },
            }
          );
          console.log(`Товар "${product.title}" успішно імпортовано! ID: ${response.data.data.id}`);
        } catch (error) {
          console.error(`Помилка при імпорті товару "${product.title}":`, error.message);
          if (error.response) {
            console.error('Статус:', error.response.status);
            console.error('Деталі помилки:', error.response.data);
          }
        }
      }
      console.log('Імпорт завершено!');
    })
    .on('error', (error) => {
      console.error('Помилка при читанні CSV:', error.message);
    });
};

importProducts();