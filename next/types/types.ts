export interface Category {
  name: string;
}

export interface Media {
  id: number;
  documentId: string;
  name: string;
  alternativeText: any;
  caption: any;
  width: any;
  height: any;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Article {
  title: string;
  description: string;
  slug: string;
  content: string;
  dynamic_zone: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  image: Media;
  categories: Category[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  plans: any[];
  perks: any[];
  featured?: boolean;
  images: any[];
  categories?: any[];
}

export interface DataCatalogue {
  id: number;
  documentId: number;
  title: string;
  slug: string;
  description: string;
  tags: string;
  image: Media;
}

export interface Policy {
  documentId: number;
  id: number;
  title: string;
  description: string;
  attachment: Media;
  createdAt: string;
}

export interface Video {
  documentId: number;
  id: number;
  title: string;
  description: string;
  url: string;
  createdAt: string;
  media: Media;
  thumbnail: Media;
  duration: string;
}
