export type Category = 'dresses' | 'tops' | 'skirts' | 'pants' | 'co-ord-sets';

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  colors: { name: string; value: string }[];
  sizes: string[];
  badge?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
};

const images = {
  burgundy: '/images/hero-burgundy.jpg',
  ivory: '/images/editorial-ivory.jpg',
  terracotta: '/images/terracotta-look.jpg',
  rose: '/images/rose-blazer.jpg',
};

export const products: Product[] = [
  {
    id: 'selma-dress',
    name: 'Selma Silk Dress',
    category: 'dresses',
    price: 28900,
    image: images.burgundy,
    gallery: [images.burgundy, images.rose],
    description: 'A softly draped silk dress cut to move with you. Selma pairs a fluid neckline with a confident, ankle-skimming line.',
    colors: [{ name: 'Burgundy', value: '#662222' }, { name: 'Rosewood', value: '#842A3B' }],
    sizes: ['34', '36', '38', '40', '42'],
    badge: 'Signature',
    isBestSeller: true,
  },
  {
    id: 'nour-coord',
    name: 'Nour Linen Co-ord',
    category: 'co-ord-sets',
    price: 24700,
    image: images.ivory,
    gallery: [images.ivory, images.terracotta],
    description: 'A considered two-piece in washed linen. Wear the clean-cut jacket and wide trouser together, or let each piece find its own rhythm.',
    colors: [{ name: 'Parchment', value: '#E9D9BD' }, { name: 'Rose', value: '#A3485A' }],
    sizes: ['34', '36', '38', '40'],
    badge: 'New arrival',
    isNew: true,
  },
  {
    id: 'ines-skirt',
    name: 'Inès Pleated Skirt',
    category: 'skirts',
    price: 16800,
    image: images.terracotta,
    gallery: [images.terracotta, images.burgundy],
    description: 'Fine pleats and a high waist give Inès an easy, elegant swing. Finished with a discreet side zip and a considered midi length.',
    colors: [{ name: 'Terracotta', value: '#A3485A' }, { name: 'Fig', value: '#662222' }],
    sizes: ['34', '36', '38', '40', '42'],
    isNew: true,
    isBestSeller: true,
  },
  {
    id: 'maya-blazer',
    name: 'Maya Soft Blazer',
    category: 'tops',
    price: 22100,
    image: images.rose,
    gallery: [images.rose, images.ivory],
    description: 'An unlined blazer with a relaxed shoulder and a quietly tailored waist. The layer that gives the rest of your wardrobe a point of view.',
    colors: [{ name: 'Rose Brown', value: '#6D3A3B' }, { name: 'Oat', value: '#D9C1A6' }],
    sizes: ['36', '38', '40', '42'],
    badge: 'Limited',
  },
  {
    id: 'amira-top',
    name: 'Amira Draped Top',
    category: 'tops',
    price: 12400,
    image: images.ivory,
    gallery: [images.ivory, images.rose],
    description: 'A fluid top with a gathered neckline and a gentle sleeve. Designed to bring softness to tailoring and structure to denim.',
    colors: [{ name: 'Parchment', value: '#F2E2CA' }, { name: 'Rose Mist', value: '#C48187' }],
    sizes: ['34', '36', '38', '40'],
    isNew: true,
  },
  {
    id: 'zohra-trouser',
    name: 'Zohra Wide Trouser',
    category: 'pants',
    price: 17900,
    image: images.terracotta,
    gallery: [images.terracotta, images.ivory],
    description: 'A long, clean line with a high waist and a full leg. Zohra is made for long lunches, late trains, and all the places in between.',
    colors: [{ name: 'Clay', value: '#B36758' }, { name: 'Ink Rose', value: '#4A2427' }],
    sizes: ['34', '36', '38', '40', '42'],
    isBestSeller: true,
  },
  {
    id: 'lyna-dress',
    name: 'Lyna Column Dress',
    category: 'dresses',
    price: 26400,
    image: images.rose,
    gallery: [images.rose, images.burgundy],
    description: 'A precise column shape softened by a ruched shoulder. Lyna is evening dressing with the volume turned down and the feeling turned up.',
    colors: [{ name: 'Rose Brown', value: '#842A3B' }, { name: 'Burgundy', value: '#662222' }],
    sizes: ['34', '36', '38', '40'],
    badge: 'New arrival',
    isNew: true,
  },
  {
    id: 'hana-set',
    name: 'Hana Knit Set',
    category: 'co-ord-sets',
    price: 20500,
    image: images.burgundy,
    gallery: [images.burgundy, images.ivory],
    description: 'A fine rib knit set that balances ease with polish. A soft, practical layer for the spaces between seasons.',
    colors: [{ name: 'Cassis', value: '#662222' }, { name: 'Cream', value: '#EBD8BF' }],
    sizes: ['36', '38', '40', '42'],
    isBestSeller: true,
  },
];

export const categoryLabels: Record<Category, string> = {
  dresses: 'Dresses',
  tops: 'Tops',
  skirts: 'Skirts',
  pants: 'Pants',
  'co-ord-sets': 'Co-ord sets',
};

export const formatPrice = (price: number) =>
  `${new Intl.NumberFormat('fr-DZ').format(price)} DA`;
