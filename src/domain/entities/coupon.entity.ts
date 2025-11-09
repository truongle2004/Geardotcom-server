import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';
import { DiscountTypeEnum } from './discount.entity';

@Entity('coupons')
export class Coupon extends BaseEntity {
  @Column({ unique: true, nullable: false, length: 50 })
  code: string;

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

  @Column({ name: 'start_date', type: 'timestamp', nullable: false })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp', nullable: false })
  endDate: Date;

  @Column({ name: 'usage_limit', nullable: true })
  usageLimit: number;

  @Column({ name: 'usage_count', default: 0 })
  usageCount: number;

  @Column({ name: 'user_limit', default: 1 })
  userLimit: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({
    name: 'required_order_total',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  requiredOrderTotal: number;
}

