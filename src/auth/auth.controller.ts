import {
  Get,
  Controller,
  Render,
  Req,
  Session,
  Res,
  Post,
  Body,
  Redirect,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import session from 'express-session';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from 'src/users/users.service';
import { SessionUserGuard } from 'src/utility/guards/session-user.guard';
import { SessionUserInterceptor } from 'src/utility/interceptors/session-user.interceptor';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Controller()
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Get('test1')
  async test1(@Req() req: any, @Res() res: Response) {
    const users = await this.usersService.findOneByEmailAndPassword(
      'user1@gmail.com',
      'asdfasdf',
    );
    console.log(users);
    return res.json(users.password);
  }

  @Get('test')
  test(@Req() req: any, @Res() res: Response) {
    console.log('isAuthenticated', req.isAuthenticated);
    if (req.isAuthenticated) {
      return res.send('TEST');
    } else {
      res.redirect('/api/v1/auth/login');
    }
  }

  @Get('login')
  login(@Req() req: any, @Res() res: Response) {
    if (req.isAuthenticated) {
      return res.redirect('/admin/dashboard');
    } else {
      res.render('auth/login.ejs', { title: 'Login | APS', body: {} });
    }
  }

  @Post('login')
  async doLogin(
    @Body() body: any,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    const validatedLoginDto = plainToInstance(LoginDto, body);
    // console.log(validatedLoginDto);
    const validationErrors = await validate(validatedLoginDto);
    if (validationErrors.length > 0) {
      // Extract error messages from validationErrors

      const errorMessages = {};
      validationErrors.forEach(
        (error) =>
          (errorMessages[error.property] = [
            ...Object.values(error.constraints),
          ][0]),
      );
      // console.log(errorMessages);

      // return res.send(errorMessages);
      return res.render('auth/login.ejs', {
        title: 'Login | APS',
        errors: errorMessages,
        body: body,
      });
    } else {
      const user = await this.usersService.findOneByEmailAndPassword(
        validatedLoginDto.email,
        validatedLoginDto.password,
      );

      if (user) {
        // console.log('user', user);
        session.user = user;
        return res.redirect('/admin/dashboard');
      } else {
        // console.log('userNo', user);
        return res.render('auth/login.ejs', {
          title: ' Login Toast | APS',
          toast_message: 'Wrong Username or Password',
          toast_type: 'alert-danger',
          body: {},
        });
      }
    }
  }

  @Get('logout')
  logout(@Res() res: Response, @Session() session: Record<string, any>) {
    session.destroy();
    return res.redirect('/login');
  }

  @Get('get-session')
  getSession(@Res() res: Response, @Session() session: Record<string, any>) {
    const user = session.user ? session.user : 'NO Session Data';
    return res.send(user);
  }
  @Get('set-session')
  setSession(@Res() res: Response, @Session() session: Record<string, any>) {
    session.user = { name: 'user1', email: 'user1@gmail.com' };
    return res.send('set session');
  }
}
