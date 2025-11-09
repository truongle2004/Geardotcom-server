import { Entity, Column, Table } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@Entity('coupon_usages')
export class CouponUsage extends BaseEntity {
  @Column({ name: 'coupon_id', nullable: false })
  couponId: number;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ name: 'order_id', nullable: true })
  orderId: number;

  @Column({ name: 'used_at', type: 'timestamp', nullable: true })
  usedAt: Date;
}
