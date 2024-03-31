import {
  Get,
  Controller,
  Render,
  Req,
  Session,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
import session from 'express-session';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @Render('auth/login.ejs')
  login(@Res() res: Response, @Session() session: Record<string, any>) {
    const user = session.user ? session.user : null;
    if (!user) {
      res.redirect('/');
    }
    return { message: 'Hello world!' };
  }

  @Post('login')
  async doLogin(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.findOne(loginDto);

    if (!user) {
      return 'Login Failed';
    } else {
      return 'Login Successfull';
    }
  }

  @Get('logout')
  logout(@Res() res: Response, @Session() session: Record<string, any>) {
    session.destroy();
    res.redirect('auth/login');
  }
}
