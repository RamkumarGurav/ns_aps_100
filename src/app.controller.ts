import {
  Get,
  Controller,
  Render,
  Req,
  Res,
  Session,
  Redirect,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { retry } from 'rxjs';

@Controller()
export class AppController {
  @Get()
  @Render('years/welcome.ejs')
  root(@Req() request: Request) {
    return { message: 'Hello world!' };
  }

  @Get('login')
  @Render('auth/login.ejs')
  login() {
    return { message: 'Hello world!' };
  }

  @Get('set-session')
  setSession(@Req() request: Request, @Session() session: Record<string, any>) {
    // Set session data
    session.user = { name: 'user1', email: 'user1@gmail.com' };
    return 'Session data set';
  }

  @Get('get-session')
  getSession(@Req() request: Request, @Session() session: Record<string, any>) {
    // Get session data
    const user = session.user ? session.user : null;

    return user ? user : 'No session data available';
  }

  @Get('destroy-session')
  @Redirect()
  destroySession(
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    // request.session.destroy((err) => console.log(err));
    session.destroy();
    return { url: '/api/v1/login' };
  }
}
