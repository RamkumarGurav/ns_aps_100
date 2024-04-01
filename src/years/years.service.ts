import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Like, Repository } from 'typeorm';
import { Year } from './year.entity';
import { CreateYearDto } from './dtos/create-year.dto';

@Injectable()
export class YearsService {
  constructor(
    @InjectRepository(Year)
    private yearsRepository: Repository<Year>,
  ) {}

  async createOne(createYearDto: CreateYearDto) {
    const newYear = await this.yearsRepository.create(createYearDto);
    return await this.yearsRepository.save(newYear);
  }

  async remove(id: number): Promise<void> {
    await this.yearsRepository.delete(id);
  }

  async findOne(id: number): Promise<Year | null> {
    return await this.yearsRepository.findOneBy({ id: id });
  }

  async findAll1(): Promise<Year[]> {
    return await this.yearsRepository.find();
  }

  async findAll(
    pageNumber: number = 1, // Default page number 1
    pageSize: number = 100, // Default page size 100
    orderObj: any, // Default order
    // yearname: string = '', // Default empty string
    where: { [key: string]: any } = {},
  ): Promise<{ data: Year[]; totalCount: number }> {
    const skip = (pageNumber - 1) * pageSize;
    const [years, totalCount] = await this.yearsRepository.findAndCount({
      where: where, // Conditionally apply search condition
      order: orderObj,
      take: pageSize,
      skip,
    });
    return { data: years, totalCount: totalCount };
  }
}
