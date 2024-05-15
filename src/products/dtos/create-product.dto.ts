import { Exclude, Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
  isNotEmpty,
  isNumber,
  isString,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
  @IsDefined({ message: 'Name is required' }) // Ensure name property is defined
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name must be a String' })
  @Transform(({ value }) => value.trim()) // Trim whitespace from incoming string
  @MinLength(2, { message: 'Name must be at least 2 characters long' }) // Minimum length of 5 characters
  @MaxLength(200, { message: 'Name must not exceed 200 characters' }) // Minimum length of 5 characters
  name: string;

  @IsDefined({ message: 'Description is required' }) // Ensure description property is defined
  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsString({ message: 'Description must be a String' })
  @Transform(({ value }) => value.trim()) // Trim whitespace from incoming string
  @MinLength(2, { message: 'Description must be at least 2 characters long' }) // Minimum length of 5 characters
  @MaxLength(200, { message: 'Description must not exceed 200 characters' }) // Minimum length of 5 characters
  description: string;

  @IsDefined({ message: 'Password is required' }) // Ensure name property is defined
  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsNumber()
  price: string;

  @Exclude()
  extra: any;
}
