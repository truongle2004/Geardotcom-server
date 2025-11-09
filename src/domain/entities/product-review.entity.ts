import { Entity, Column, Table } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@Entity('product_reviews')
export class ProductReview extends BaseEntity {
  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ name: 'is_approved', default: true })
  isApproved: boolean;

  @Column({ name: 'helpful_count', default: 0 })
  helpfulCount: number;
}

