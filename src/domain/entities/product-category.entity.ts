import { BaseEntity } from 'src/shared/base.entity';
import { Entity, Column, Unique } from 'typeorm';

@Entity('product_categories')
export class ProductCategory extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  handle: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number;

  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'product_count', default: 0 })
  productCount: number;
}
