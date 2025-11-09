import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { IProductRepository } from 'src/modules/sale-module/infrastructure/repositories/product.repository.interface';
import type { IProductImageRepository } from 'src/modules/sale-module/infrastructure/repositories/product-image.repository.interface';
import type { IProductService, PaginatedResult } from 'src/modules/sale-module/application/services/product.service.interface';
import { ProductQueryDto } from 'src/domain/requests/product-query.dto';
import { ProductResponseDto, CategoryResponseDto, VendorResponseDto } from 'src/domain/response/product.response.dto';

export const PRODUCT_REPOSITORY_TOKEN = Symbol('PRODUCT_REPOSITORY');
export const PRODUCT_IMAGE_REPOSITORY_TOKEN = Symbol('PRODUCT_IMAGE_REPOSITORY');
export const PRODUCT_SERVICE_TOKEN = Symbol('PRODUCT_SERVICE');

@Injectable()
export class ProductService implements IProductService {
  private readonly fileUploadUrl: string;

  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
    @Inject(PRODUCT_IMAGE_REPOSITORY_TOKEN)
    private readonly productImageRepository: IProductImageRepository,
    private readonly configService: ConfigService,
  ) {
    this.fileUploadUrl =
      this.configService.get<string>('FILE_UPLOAD_URL') ||
      'http://localhost:3000/api/v1/sale/products';
  }

  async getListProductByCategory(
    query: ProductQueryDto,
  ): Promise<PaginatedResult<ProductResponseDto>> {
    const page = query.page || 0;
    const limit = query.limit || 10;
    const [products, total] = await this.productRepository.findWithFilters(
      page,
      limit,
      query.category,
      query.vendor,
      query.min,
      query.max,
    );

    const productDtos = await Promise.all(
      products.map(async (product) => {
        const images = await this.productImageRepository.findByProductId(
          product.id,
          this.fileUploadUrl,
        );
        return this.mapToProductDto(product, images);
      }),
    );

    return {
      data: productDtos,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getById(id: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const images = await this.productImageRepository.findByProductId(
      product.id,
      this.fileUploadUrl,
    );

    return this.mapToProductDto(product, images);
  }

  async getAllProductCategory(): Promise<CategoryResponseDto[]> {
    const categories = await this.productRepository.getAllCategories();
    return categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      handle: cat.handle,
      description: cat.description,
    }));
  }

  async getAllVendor(): Promise<VendorResponseDto[]> {
    const vendors = await this.productRepository.getAllVendors();
    return vendors.map((vendor) => ({
      id: vendor.id,
      name: vendor.name,
      handle: vendor.handle,
      description: vendor.description,
    }));
  }

  async getBestSellers(
    query: ProductQueryDto,
  ): Promise<PaginatedResult<ProductResponseDto>> {
    const page = query.page || 0;
    const limit = query.limit || 10;
    const [products, total] = await this.productRepository.findBestSellers(
      page,
      limit,
    );

    const productDtos = await Promise.all(
      products.map(async (product) => {
        const images = await this.productImageRepository.findByProductId(
          product.id,
          this.fileUploadUrl,
        );
        return this.mapToProductDto(product, images);
      }),
    );

    return {
      data: productDtos,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getFeaturedProducts(
    query: ProductQueryDto,
  ): Promise<PaginatedResult<ProductResponseDto>> {
    const page = query.page || 0;
    const limit = query.limit || 10;
    const [products, total] = await this.productRepository.findFeaturedProducts(
      page,
      limit,
    );

    const productDtos = await Promise.all(
      products.map(async (product) => {
        const images = await this.productImageRepository.findByProductId(
          product.id,
          this.fileUploadUrl,
        );
        return this.mapToProductDto(product, images);
      }),
    );

    return {
      data: productDtos,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getTopRatedProducts(
    query: ProductQueryDto,
  ): Promise<PaginatedResult<ProductResponseDto>> {
    const page = query.page || 0;
    const limit = query.limit || 10;
    const [products, total] =
      await this.productRepository.findTopRatedProducts(page, limit);

    const productDtos = await Promise.all(
      products.map(async (product) => {
        const images = await this.productImageRepository.findByProductId(
          product.id,
          this.fileUploadUrl,
        );
        return this.mapToProductDto(product, images);
      }),
    );

    return {
      data: productDtos,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async searchProducts(
    query: ProductQueryDto,
  ): Promise<PaginatedResult<ProductResponseDto>> {
    const page = query.page || 0;
    const limit = query.limit || 10;
    const [products, total] = await this.productRepository.searchProducts(
      query.q || '',
      page,
      limit,
      query.category,
      query.vendor,
      query.min,
      query.max,
    );

    const productDtos = await Promise.all(
      products.map(async (product) => {
        const images = await this.productImageRepository.findByProductId(
          product.id,
          this.fileUploadUrl,
        );
        return this.mapToProductDto(product, images);
      }),
    );

    return {
      data: productDtos,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private mapToProductDto(product: any, images: any[]): ProductResponseDto {
    return {
      id: product.id,
      handle: product.handle,
      description: product.description,
      title: product.title,
      warehouseId: product.warehouseId,
      productVendorId: product.productVendorId,
      productCategoryId: product.productCategoryId,
      publishedScope: product.publishedScope,
      purchaseCount: product.purchaseCount,
      averageRating: Number(product.averageRating),
      reviewCount: product.reviewCount,
      tags: product.tags,
      price: Number(product.price),
      images: images.length > 0 ? images : undefined,
      soleQuantity: product.soleQuantity,
      notAllowPromotion: product.notAllowPromotion,
      available: product.available,
    };
  }
}

