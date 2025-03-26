import type { Schema, Struct } from '@strapi/strapi';

export interface FaqItem extends Struct.ComponentSchema {
  collectionName: 'components_faq_items';
  info: {
    description: '\u041E\u0434\u0438\u043D \u0432\u043E\u043F\u0440\u043E\u0441 \u0438 \u043E\u0442\u0432\u0435\u0442 \u0434\u043B\u044F FAQ';
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductVariation extends Struct.ComponentSchema {
  collectionName: 'components_product_variations';
  info: {
    description: '\u0412\u0430\u0440\u0456\u0430\u0446\u0456\u044F \u0442\u043E\u0432\u0430\u0440\u0443 \u0437 \u0432\u043B\u0430\u0441\u043D\u0438\u043C \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F\u043C \u0456 \u0446\u0456\u043D\u043E\u044E';
    displayName: '\u0412\u0430\u0440\u0456\u0430\u0446\u0456\u044F';
  };
  attributes: {
    image: Schema.Attribute.Media;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
    stock: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SharedCategoryEmbed extends Struct.ComponentSchema {
  collectionName: 'components_shared_category_embeds';
  info: {
    icon: 'folder';
    name: 'Category Embed';
  };
  attributes: {
    categoryId: Schema.Attribute.String & Schema.Attribute.Required;
    categoryName: Schema.Attribute.String;
  };
}

export interface SharedImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_images';
  info: {
    icon: 'image';
    name: 'Image';
  };
  attributes: {
    altText: Schema.Attribute.String;
    media: Schema.Attribute.Media & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedProductEmbed extends Struct.ComponentSchema {
  collectionName: 'components_shared_product_embeds';
  info: {
    icon: 'shopping-bag';
    name: 'Product Embed';
  };
  attributes: {
    productId: Schema.Attribute.String & Schema.Attribute.Required;
    productName: Schema.Attribute.String;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO-\u043C\u0435\u0442\u0430\u0434\u0430\u043D\u0456 \u0434\u043B\u044F \u0441\u0442\u043E\u0440\u0456\u043D\u043E\u043A \u0456 \u0442\u043E\u0432\u0430\u0440\u0456\u0432';
    displayName: 'SEO';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaImage: Schema.Attribute.Media;
    metaKeywords: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedText extends Struct.ComponentSchema {
  collectionName: 'components_shared_texts';
  info: {
    icon: 'paragraph';
    name: 'Text';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'faq.item': FaqItem;
      'product.variation': ProductVariation;
      'shared.category-embed': SharedCategoryEmbed;
      'shared.image': SharedImage;
      'shared.media': SharedMedia;
      'shared.product-embed': SharedProductEmbed;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.text': SharedText;
    }
  }
}
