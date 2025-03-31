
export interface Product {
  id: string;
  name: string;
  price: number;
  code: string;
  quantity: number;
  imageUrl: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  lowStockThreshold: number;
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: ProductFormData) => void;
  updateProduct: (id: string, product: ProductFormData) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  lowStockProducts: Product[];
}
