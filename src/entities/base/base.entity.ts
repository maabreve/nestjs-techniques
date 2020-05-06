import { PrimaryGeneratedColumn } from 'typeorm';
// --->>>> nova na nova
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}