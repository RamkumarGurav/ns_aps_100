import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async createOne(createProductDto: CreateProductDto) {
    const newProduct = await this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(createProductDto);
  }

  async updateOne(id: number, updateProductDto: UpdateProductDto) {
    const toUpdate = await this.productsRepository.findOne({ where: { id } });

    const updated = Object.assign(toUpdate, updateProductDto);

    return await this.productsRepository.save(updated);
  }

  async findOneByEmailAndPassword(email: string, password: string) {
    const product = await this.productsRepository.findOneBy({
      email: email,
      password: password,
    });
    return product;
  }
  async findOneByLoginDto(loginDto: LoginDto) {
    const product = await this.productsRepository.findOneBy({ ...loginDto });
    return product;
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }

  async findOne(id: number): Promise<Product | null> {
    return await this.productsRepository.findOneBy({ id: id });
  }

  async findAll1(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findAll(
    pageNumber: number = 1, // Default page number 1
    pageSize: number = 100, // Default page size 100
    orderObj: any, // Default order
    // productname: string = '', // Default empty string
    where: { [key: string]: any } = {},
  ): Promise<{ data: Product[]; totalCount: number }> {
    const skip = (pageNumber - 1) * pageSize;
    const [products, totalCount] = await this.productsRepository.findAndCount({
      where: where, // Conditionally apply search condition
      order: orderObj,
      take: pageSize,
      skip,
    });
    return { data: products, totalCount: totalCount };
  }

  async search(
    pageNumber: number = 1, // Default page number 1
    pageSize: number = 100, // Default page size 100
    orderObj: any, // Default order
    // productname: string = '', // Default empty string
    where: { [key: string]: any } = {},
    name: any,
  ): Promise<{ data: Product[]; totalCount: number }> {
    const skip = (pageNumber - 1) * pageSize;
    const [products, totalCount] = await this.productsRepository.findAndCount({
      // where: { name: { like: `%${q}%` }, ...where }, // Conditionally apply search condition
      where: name ? { name: Like(`%${name}%`), ...where } : { ...where },
      order: orderObj,
      take: pageSize,
      skip,
    });
    return { data: products, totalCount: totalCount };
  }
}
