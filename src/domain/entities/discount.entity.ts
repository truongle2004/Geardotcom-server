import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

export enum DiscountTypeEnum {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
}

export enum ApplicableToEnum {
  PRODUCT = 'PRODUCT',
  CATEGORY = 'CATEGORY',
  ALL = 'ALL',
}

@Entity('discounts')
export class Discount extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    name: 'discount_type',
    type: 'enum',
    enum: DiscountTypeEnum,
    nullable: false,
  })
  discountType: DiscountTypeEnum;

  @Column({
    name: 'discount_value',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  discountValue: number;

  @Column({
    name: 'minimum_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  minimumAmount: number;

  @Column({
    name: 'maximum_discount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  maximumDiscount: number;

  @Column({
    name: 'applicable_to',
    type: 'enum',
    enum: ApplicableToEnum,
    nullable: false,
  })
  applicableTo: ApplicableToEnum;

  @Column({ name: 'product_id', nullable: true })
  productId: number;

  @Column({ name: 'product_category_id', nullable: true })
  productCategoryId: number;

  @Column({ name: 'start_date', type: 'timestamp', nullable: false })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp', nullable: false })
  endDate: Date;

  @Column({ name: 'usage_limit', nullable: true })
  usageLimit: number;

  @Column({ name: 'usage_count', default: 0 })
  usageCount: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}

