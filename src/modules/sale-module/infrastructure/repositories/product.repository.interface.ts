import { Product } from 'src/domain/entities/product.entity';
import { ProductCategory } from 'src/domain/entities/product-category.entity';
import { ProductVendor } from 'src/domain/entities/product-vendor.entity';

export interface IProductRepository {
  findById(id: number): Promise<Product | null>;
  findWithFilters(
    page: number,
    limit: number,
    category?: string,
    vendor?: string,
    minPrice?: number,
    maxPrice?: number,
  ): Promise<[Product[], number]>;
  getAllCategories(): Promise<ProductCategory[]>;
  getAllVendors(): Promise<ProductVendor[]>;
  findBestSellers(page: number, limit: number): Promise<[Product[], number]>;
  findFeaturedProducts(
    page: number,
    limit: number,
  ): Promise<[Product[], number]>;
  findTopRatedProducts(
    page: number,
    limit: number,
  ): Promise<[Product[], number]>;
  searchProducts(
    query: string,
    page: number,
    limit: number,
    category?: string,
    vendor?: string,
    minPrice?: number,
    maxPrice?: number,
  ): Promise<[Product[], number]>;
}
