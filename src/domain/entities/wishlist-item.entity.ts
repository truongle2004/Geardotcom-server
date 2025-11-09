import { Entity, Column, Table } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@Entity('wishlist_items')
export class WishlistItem extends BaseEntity {
  @Column({ name: 'wishlist_id', nullable: false })
  wishlistId: number;

  @Column({ name: 'product_id', nullable: false })
  productId: number;
}

