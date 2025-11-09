import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@Entity('product_vendors')
export class ProductVendor extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  handle: string;

  @Column({ name: 'product_category_id', nullable: true })
  productCategoryId: number;

  @Column({ type: 'text', nullable: true })
  description: string;
}
