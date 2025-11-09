import { Entity, Column, Table } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@Entity('cart_items')
export class CartItem extends BaseEntity {
  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ name: 'cart_id', nullable: false })
  cartId: number;

  @Column({ nullable: false })
  quantity: number;
}

