import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
@Module({
  imports: [PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [LocalStrategy],
})
export class AuthModule {}
