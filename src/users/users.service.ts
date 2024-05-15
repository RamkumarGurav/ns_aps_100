import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Like, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createOne(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(createUserDto);
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    const toUpdate = await this.usersRepository.findOne({ where: { id } });

    const updated = Object.assign(toUpdate, updateUserDto);

    return await this.usersRepository.save(updated);
  }

  async findOneByEmailAndPassword(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({
      email: email,
      password: password,
    });
    return user;
  }
  async findOneByLoginDto(loginDto: LoginDto) {
    const user = await this.usersRepository.findOneBy({ ...loginDto });
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id: id });
  }

  async findAll1(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findAll(
    pageNumber: number = 1, // Default page number 1
    pageSize: number = 100, // Default page size 100
    orderObj: any, // Default order
    // username: string = '', // Default empty string
    where: { [key: string]: any } = {},
  ): Promise<{ data: User[]; totalCount: number }> {
    const skip = (pageNumber - 1) * pageSize;
    const [users, totalCount] = await this.usersRepository.findAndCount({
      where: where, // Conditionally apply search condition
      order: orderObj,
      take: pageSize,
      skip,
    });
    return { data: users, totalCount: totalCount };
  }

  async search(
    pageNumber: number = 1, // Default page number 1
    pageSize: number = 100, // Default page size 100
    orderObj: any, // Default order
    // username: string = '', // Default empty string
    where: { [key: string]: any } = {},
    name: any,
  ): Promise<{ data: User[]; totalCount: number }> {
    const skip = (pageNumber - 1) * pageSize;
    const [users, totalCount] = await this.usersRepository.findAndCount({
      // where: { name: { like: `%${q}%` }, ...where }, // Conditionally apply search condition
      where: name ? { name: Like(`%${name}%`), ...where } : { ...where },
      order: orderObj,
      take: pageSize,
      skip,
    });
    return { data: users, totalCount: totalCount };
  }
}
