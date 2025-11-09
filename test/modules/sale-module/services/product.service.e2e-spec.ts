import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';
import {
  PRODUCT_IMAGE_REPOSITORY_TOKEN,
  PRODUCT_REPOSITORY_TOKEN,
  ProductService,
} from '../../../../src/modules/sale-module/application/services/impl/product.service';
import type { IProductRepository } from '../../../../src/modules/sale-module/infrastructure/repositories/product.repository.interface';
import type { IProductImageRepository } from '../../../../src/modules/sale-module/infrastructure/repositories/product-image.repository.interface';
import { ProductQueryDto } from '../../../../src/domain/requests/product-query.dto';

describe('ProductService (E2E)', () => {
  let service: ProductService;
  let productRepo: IProductRepository;
  let productImageRepo: IProductImageRepository;

  const mockProduct = {
    id: 1,
    handle: 'product-1',
    title: 'Product 1',
    description: 'Description',
    warehouseId: 10,
    productVendorId: 2,
    productCategoryId: 3,
    publishedScope: 'public',
    purchaseCount: 5,
    averageRating: 4.5,
    reviewCount: 10,
    tags: ['tag1', 'tag2'],
    price: 100,
    soleQuantity: 20,
    notAllowPromotion: false,
    available: true,
  };

  const mockImage = [{ url: 'http://example.com/image1.jpg' }];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PRODUCT_REPOSITORY_TOKEN,
          useValue: {
            findWithFilters: jest.fn().mockResolvedValue([[mockProduct], 1]),
            findById: jest.fn().mockResolvedValue(mockProduct),
            getAllCategories: jest
              .fn()
              .mockResolvedValue([
                {
                  id: 1,
                  name: 'Category 1',
                  handle: 'cat-1',
                  description: 'desc',
                },
              ]),
            getAllVendors: jest
              .fn()
              .mockResolvedValue([
                {
                  id: 1,
                  name: 'Vendor 1',
                  handle: 'vendor-1',
                  description: 'desc',
                },
              ]),
            findBestSellers: jest.fn().mockResolvedValue([[mockProduct], 1]),
            findFeaturedProducts: jest
              .fn()
              .mockResolvedValue([[mockProduct], 1]),
            findTopRatedProducts: jest
              .fn()
              .mockResolvedValue([[mockProduct], 1]),
            searchProducts: jest.fn().mockResolvedValue([[mockProduct], 1]),
          },
        },
        {
          provide: PRODUCT_IMAGE_REPOSITORY_TOKEN,
          useValue: {
            findByProductId: jest.fn().mockResolvedValue(mockImage),
          },
        },
        ConfigService,
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepo = module.get<IProductRepository>(PRODUCT_REPOSITORY_TOKEN);
    productImageRepo = module.get<IProductImageRepository>(
      PRODUCT_IMAGE_REPOSITORY_TOKEN,
    );
  });

  it('should return a list of products by category', async () => {
    const result = await service.getListProductByCategory(
      new ProductQueryDto(),
    );
    expect(result.data.length).toBe(1);
    expect(result.data[0].id).toBe(mockProduct.id);
    expect(productRepo.findWithFilters).toHaveBeenCalled();
    expect(productImageRepo.findByProductId).toHaveBeenCalledWith(
      mockProduct.id,
      expect.any(String),
    );
  });

  it('should get product by ID', async () => {
    const result = await service.getById(1);
    expect(result.id).toBe(mockProduct.id);
  });

  it('should throw NotFoundException if product not found', async () => {
    jest.spyOn(productRepo, 'findById').mockResolvedValueOnce(null);
    await expect(service.getById(999)).rejects.toThrow(NotFoundException);
  });

  it('should get all categories', async () => {
    const result = await service.getAllProductCategory();
    expect(result[0].name).toBe('Category 1');
  });

  it('should get all vendors', async () => {
    const result = await service.getAllVendor();
    expect(result[0].name).toBe('Vendor 1');
  });

  it('should get best sellers', async () => {
    const result = await service.getBestSellers(new ProductQueryDto());
    expect(result.data[0].id).toBe(mockProduct.id);
  });

  it('should get featured products', async () => {
    const result = await service.getFeaturedProducts(new ProductQueryDto());
    expect(result.data[0].id).toBe(mockProduct.id);
  });

  it('should get top rated products', async () => {
    const result = await service.getTopRatedProducts(new ProductQueryDto());
    expect(result.data[0].id).toBe(mockProduct.id);
  });

  it('should search products', async () => {
    const query = new ProductQueryDto();
    query.q = 'Product';
    query.page = 0;
    query.limit = 10;

    const result = await service.searchProducts(query);
    expect(result.data[0].id).toBe(mockProduct.id);
  });
});
