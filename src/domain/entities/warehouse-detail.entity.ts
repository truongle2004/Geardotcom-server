import { Entity, Column, Table } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@Entity('warehouse_details')
export class WarehouseDetail extends BaseEntity {
  @Column({ name: 'warehouse_id', nullable: false })
  warehouseId: number;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ nullable: false })
  stock: number;
}

