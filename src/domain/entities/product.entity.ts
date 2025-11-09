import { Entity, Column, Index, Unique } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@Entity('products')
@Index(['price'])
@Index(['averageRating'])
@Index(['reviewCount'])
export class Product extends BaseEntity {
  @Column({ nullable: false })
  handle: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: false, length: 500 })
  title: string;

  @Column({ name: 'warehouse_id', nullable: true })
  warehouseId: number;

  @Column({ name: 'product_vendor_id', nullable: true })
  productVendorId: number;

  @Column({ name: 'product_category_id', nullable: true })
  productCategoryId: number;

  @Column({ name: 'published_scope', length: 50, default: 'web' })
  publishedScope: string;

  @Column({ name: 'purchase_count', default: 0 })
  purchaseCount: number;

  @Column({
    name: 'average_rating',
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 0.0,
  })
  averageRating: number;

  @Column({ name: 'review_count', default: 0 })
  reviewCount: number;

  @Column({ type: 'text', nullable: true })
  tags: string;

  @Column({ name: 'sole_quantity', default: 0 })
  soleQuantity: number;

  @Column({ name: 'not_allow_promotion', default: false })
  notAllowPromotion: boolean;

  @Column({ default: true })
  available: boolean;
}

