import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@Entity('warehouse')
export class Warehouse extends BaseEntity {
  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, length: 20 })
  code: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ length: 100, nullable: true })
  state: string;

  @Column({ length: 100, nullable: true })
  country: string;

  @Column({ name: 'postal_code', length: 20, nullable: true })
  postalCode: string;

  @Column({ nullable: true })
  capacity: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
