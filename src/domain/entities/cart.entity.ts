import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@Entity('carts')
export class Cart extends BaseEntity {
  @Column({ name: 'user_id', nullable: false })
  userId: string;
}
