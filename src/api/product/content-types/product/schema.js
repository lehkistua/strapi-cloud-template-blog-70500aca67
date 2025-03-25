'use strict';

module.exports = {
  kind: 'collectionType', // Указываем, что это Collection Type (для списка продуктов)
  collectionName: 'products', // Название коллекции в базе данных
  info: {
    singularName: 'product', // Единственное число
    pluralName: 'products', // Множественное число
    displayName: 'Product', // Отображаемое имя в админке
    description: 'A collection of products for the online store', // Описание
  },
  options: {
    draftAndPublish: true, // Включаем возможность черновиков и публикации
  },
  attributes: {
    name: {
      type: 'string', // Название продукта
      required: true, // Обязательное поле
    },
    description: {
      type: 'text', // Описание продукта
      required: false, // Необязательное поле
    },
    price: {
      type: 'decimal', // Цена (с поддержкой дробных чисел)
      required: true, // Обязательное поле
    },
    stock: {
      type: 'integer', // Количество на складе
      required: true, // Обязательное поле
      default: 0, // Значение по умолчанию
    },
    image: {
      type: 'media', // Поле для загрузки изображения (поддерживает картинки, видео и т.д.)
      allowedTypes: ['images'], // Разрешаем только изображения
      multiple: false, // Одно изображение на продукт
      required: false, // Необязательное поле
    },
    category: {
      type: 'string', // Категория продукта (можно позже заменить на relation, если нужна связь с другой коллекцией)
      required: false,
    },
    isAvailable: {
      type: 'boolean', // Доступен ли продукт
      default: true, // По умолчанию доступен
    },
    slug: {
      type: 'uid', // Уникальный идентификатор (например, для URL)
      targetField: 'name', // Генерируется на основе поля name
      required: true,
    },
  },
};