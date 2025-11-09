import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Product,
  ProductCategory,
  ProductVendor,
  ProductImage,
} from '../../domain/entities';
import { ProductRepository } from './infrastructure/repositories/impl/product.repository';
import { ProductImageRepository } from './infrastructure/repositories/impl/product-image.repository';
import { ProductService, PRODUCT_REPOSITORY_TOKEN, PRODUCT_IMAGE_REPOSITORY_TOKEN, PRODUCT_SERVICE_TOKEN } from './application/services/impl/product.service';
import { ProductController } from './controller/product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductCategory,
      ProductVendor,
      ProductImage,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    // Repository implementations (needed for TypeORM injection)
    ProductRepository,
    ProductImageRepository,
    // Provide interfaces using tokens (for dependency injection)
    {
      provide: PRODUCT_REPOSITORY_TOKEN,
      useClass: ProductRepository,
    },
    {
      provide: PRODUCT_IMAGE_REPOSITORY_TOKEN,
      useClass: ProductImageRepository,
    },
    // Service implementation
    ProductService,
    // Provide service interface using token
    {
      provide: PRODUCT_SERVICE_TOKEN,
      useClass: ProductService,
    },
  ],
  exports: [PRODUCT_SERVICE_TOKEN],
})
export class SaleModule {}
