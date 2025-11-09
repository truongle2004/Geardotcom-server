import { ApiProperty } from '@nestjs/swagger';

export class ProductImageResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  src: string;

  @ApiProperty()
  alt: string;

  @ApiProperty()
  position: number;
}

export class ProductResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  handle: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  warehouseId?: number;

  @ApiProperty({ required: false })
  productVendorId?: number;

  @ApiProperty({ required: false })
  productCategoryId?: number;

  @ApiProperty()
  publishedScope: string;

  @ApiProperty()
  purchaseCount: number;

  @ApiProperty()
  averageRating: number;

  @ApiProperty()
  reviewCount: number;

  @ApiProperty({ required: false })
  tags?: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ type: [ProductImageResponseDto], required: false })
  images?: ProductImageResponseDto[];

  @ApiProperty()
  soleQuantity: number;

  @ApiProperty()
  notAllowPromotion: boolean;

  @ApiProperty()
  available: boolean;
}

export class CategoryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  handle: string;

  @ApiProperty({ required: false })
  description?: string;
}

export class VendorResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  handle: string;

  @ApiProperty({ required: false })
  description?: string;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ type: [Object] })
  data: T[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPages: number;
}
