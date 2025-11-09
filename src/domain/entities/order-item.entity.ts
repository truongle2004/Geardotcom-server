import { Entity, Column, Table } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@Entity('order_items')
export class OrderItem extends BaseEntity {
  @Column({ name: 'order_id', nullable: false })
  orderId: number;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ nullable: false })
  quantity: number;
}

