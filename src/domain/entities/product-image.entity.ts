import { Entity, Column, Table } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@Entity('product_images')
export class ProductImage extends BaseEntity {
  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ nullable: true })
  src: string;

  @Column({ nullable: true })
  alt: string;

  @Column({ default: 0 })
  position: number;
}
