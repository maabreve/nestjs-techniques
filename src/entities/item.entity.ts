import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base/base.entity';

@Entity()
export class Item extends BaseEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  image: string;

}
