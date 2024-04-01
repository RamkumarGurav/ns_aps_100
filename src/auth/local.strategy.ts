import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmailAndPassword(
      username,
      password,
    );

    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
