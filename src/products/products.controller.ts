import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateProductDto } from './dtos/create-product.dto';
import { Response } from 'express';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // =============> CRUD <==============

  @Get()
  getAllProducts() {
    return this.productsService.findAll1();
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createOne(createProductDto);
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateOne(+id, updateProductDto);
  }
}
