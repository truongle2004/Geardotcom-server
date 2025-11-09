import { ProductQueryDto } from 'src/domain/requests/product-query.dto';
import {
  ProductResponseDto,
  CategoryResponseDto,
  VendorResponseDto,
} from 'src/domain/response/product.response.dto';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IProductService {
  getListProductByCategory(
    query: ProductQueryDto,
  ): Promise<PaginatedResult<ProductResponseDto>>;
  getById(id: number): Promise<ProductResponseDto>;
  getAllProductCategory(): Promise<CategoryResponseDto[]>;
  getAllVendor(): Promise<VendorResponseDto[]>;
  getBestSellers(
    query: ProductQueryDto,
  ): Promise<PaginatedResult<ProductResponseDto>>;
  getFeaturedProducts(
    query: ProductQueryDto,
  ): Promise<PaginatedResult<ProductResponseDto>>;
  getTopRatedProducts(
    query: ProductQueryDto,
  ): Promise<PaginatedResult<ProductResponseDto>>;
  searchProducts(
    query: ProductQueryDto,
  ): Promise<PaginatedResult<ProductResponseDto>>;
}
