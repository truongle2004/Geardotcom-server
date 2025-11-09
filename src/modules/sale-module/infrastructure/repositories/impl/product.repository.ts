import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/domain/entities/product.entity';
import { ProductCategory } from 'src/domain/entities/product-category.entity';
import { ProductVendor } from 'src/domain/entities/product-vendor.entity';
import { IProductRepository } from 'src/modules/sale-module/infrastructure/repositories/product.repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly categoryRepo: Repository<ProductCategory>,
    @InjectRepository(ProductVendor)
    private readonly vendorRepo: Repository<ProductVendor>,
  ) {}

  async findById(id: number): Promise<Product | null> {
    return this.productRepo.findOne({ where: { id } });
  }

  async findWithFilters(
    page: number,
    limit: number,
    category?: string,
    vendor?: string,
    minPrice?: number,
    maxPrice?: number,
  ): Promise<[Product[], number]> {
    const queryBuilder = this.productRepo
      .createQueryBuilder('product')
      .where('product.available = :available', { available: true });

    if (category && category !== 'all' && category !== '') {
      queryBuilder
        .leftJoin(
          ProductCategory,
          'category',
          'category.id = product.productCategoryId',
        )
        .andWhere('category.handle = :category', { category });
    }

    if (vendor && vendor !== '') {
      queryBuilder
        .leftJoin(
          ProductVendor,
          'vendor',
          'vendor.id = product.productVendorId',
        )
        .andWhere('vendor.handle = :vendor', { vendor });
    }

    if (minPrice != null) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice != null) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    queryBuilder.skip(page * limit).take(limit);

    return queryBuilder.getManyAndCount();
  }

  async getAllCategories() {
    return this.categoryRepo.find({
      select: ['id', 'name', 'handle', 'description'],
    });
  }

  async getAllVendors() {
    return this.vendorRepo.find({
      select: ['id', 'name', 'handle', 'description'],
    });
  }

  async findBestSellers(page: number, limit: number): Promise<[Product[], number]> {
    return this.productRepo.findAndCount({
      where: { available: true },
      order: { soleQuantity: 'DESC' },
      skip: page * limit,
      take: limit,
    });
  }

  async findFeaturedProducts(page: number, limit: number): Promise<[Product[], number]> {
    return this.productRepo.findAndCount({
      where: { available: true },
      order: { averageRating: 'DESC', reviewCount: 'DESC' },
      skip: page * limit,
      take: limit,
    });
  }

  async findTopRatedProducts(page: number, limit: number): Promise<[Product[], number]> {
    return this.productRepo.findAndCount({
      where: { available: true },
      order: { averageRating: 'DESC', reviewCount: 'DESC' },
      skip: page * limit,
      take: limit,
    });
  }

  async searchProducts(
    query: string,
    page: number,
    limit: number,
    category?: string,
    vendor?: string,
    minPrice?: number,
    maxPrice?: number,
  ): Promise<[Product[], number]> {
    const queryBuilder = this.productRepo
      .createQueryBuilder('product')
      .where('product.available = :available', { available: true });

    if (query && query.trim() !== '') {
      queryBuilder.andWhere(
        '(product.title ILIKE :query OR product.description ILIKE :query OR product.tags ILIKE :query)',
        { query: `%${query}%` },
      );
    }

    if (category && category !== 'all' && category !== '') {
      queryBuilder
        .leftJoin(
          ProductCategory,
          'category',
          'category.id = product.productCategoryId',
        )
        .andWhere('category.handle = :category', { category });
    }

    if (vendor && vendor !== '') {
      queryBuilder
        .leftJoin(
          ProductVendor,
          'vendor',
          'vendor.id = product.productVendorId',
        )
        .andWhere('vendor.handle = :vendor', { vendor });
    }

    if (minPrice != null) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice != null) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    queryBuilder.skip(page * limit).take(limit);

    return queryBuilder.getManyAndCount();
  }
}

