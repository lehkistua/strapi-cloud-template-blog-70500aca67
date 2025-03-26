import type { Schema, Struct } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'product.variation': ProductVariation;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
