export interface ProductImageDto {
  id: number;
  src: string | null;
  alt: string | null;
  position: number;
}

export interface IProductImageRepository {
  findByProductId(
    productId: number,
    fileUploadUrl: string,
  ): Promise<ProductImageDto[]>;
  findMainImage(
    productId: number,
    fileUploadUrl: string,
  ): Promise<ProductImageDto | null>;
}
