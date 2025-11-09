import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from 'src/domain/entities/product-image.entity';
import {
  IProductImageRepository,
  ProductImageDto,
} from 'src/modules/sale-module/infrastructure/repositories/product-image.repository.interface';

@Injectable()
export class ProductImageRepository implements IProductImageRepository {
  constructor(
    @InjectRepository(ProductImage)
    private readonly imageRepo: Repository<ProductImage>,
  ) {}

  async findByProductId(
    productId: number,
    fileUploadUrl: string,
  ): Promise<ProductImageDto[]> {
    const images = await this.imageRepo.find({
      where: { productId },
      order: { position: 'ASC' },
    });

    return images.map((img) => ({
      id: img.id,
      src: img.src ? `${fileUploadUrl}/${img.src}` : null,
      alt: img.alt,
      position: img.position,
    }));
  }

  async findMainImage(
    productId: number,
    fileUploadUrl: string,
  ): Promise<ProductImageDto | null> {
    const image = await this.imageRepo.findOne({
      where: { productId, position: 0 },
    });

    if (!image) return null;

    return {
      id: image.id,
      src: image.src ? `${fileUploadUrl}/${image.src}` : null,
      alt: image.alt,
      position: image.position,
    };
  }
}

