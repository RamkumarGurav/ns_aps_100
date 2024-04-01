import { IsNotEmpty, IsString, isString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'aps_years' })
export class Year {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_year: string;

  @Column()
  end_year: string;

  @Column()
  fiscal_year: string;

  @Column({ default: '1' })
  status: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  added_on: Date;

  @Column({ type: 'datetime', default: null, onUpdate: 'CURRENT_TIMESTAMP' })
  updated_on: Date;
}
