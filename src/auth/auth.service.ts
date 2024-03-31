import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dtos/login.dto';
import { EntityNotFoundError, Like, Repository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
  ) {}

  async findOne(loginDto: LoginDto) {
    return await this.authRepository.findOneBy({
      email: loginDto.email,
      password: loginDto.password,
    });
  }
}
