import { Entity, Column, Table } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@Entity('wishlists')
export class Wishlist extends BaseEntity {
  @Column({ name: 'user_id', nullable: false })
  userId: string;
}

