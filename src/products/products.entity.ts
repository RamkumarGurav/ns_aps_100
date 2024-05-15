import { IsNotEmpty, IsString, isString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'aps_products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column({ default: '1' })
  @IsString()
  status: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  added_on: Date;

  @Column({ type: 'datetime', default: null, onUpdate: 'CURRENT_TIMESTAMP' })
  updated_on: Date;
}
