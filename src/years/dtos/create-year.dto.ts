import { Exclude, Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
  isNotEmpty,
  isNumber,
  isNumberString,
  isString,
  length,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateYearDto {
  @IsDefined({ message: 'Start Year is required' }) // Ensure name property is defined
  @IsNotEmpty({ message: 'Start Year should not be empty' })
  @IsNumber()
  @Length(4)
  @Transform(({ value }) => value.trim()) // Trim whitespace from incoming string
  start_year: number;

  @IsDefined({ message: 'Start Year is required' }) // Ensure name property is defined
  @IsNotEmpty({ message: 'Start Year should not be empty' })
  @IsNumber()
  @Length(4)
  @Transform(({ value }) => value.trim()) // Trim whitespace from incoming string
  end_year: number;

  @IsDefined({ message: 'Fiscal Year is required' }) // Ensure name property is defined
  @IsNotEmpty({ message: 'Fiscal Year should not be empty' })
  @IsString({ message: 'Fiscal Year must be a string' })
  @Length(7)
  @Transform(({ value }) => value.trim()) // Trim whitespace from incoming string
  fiscal_year: string;

  @Exclude()
  extra: any;
}
