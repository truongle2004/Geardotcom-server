import { Entity, Column, Table } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

@Entity('orders')
export class Order extends BaseEntity {
  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({
    name: 'total_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;
}

