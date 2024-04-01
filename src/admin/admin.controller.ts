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
  UseFilters,
} from '@nestjs/common';
import { Request, Response } from 'express';
import session from 'express-session';
import { UsersService } from 'src/users/users.service';
import { NotFoundExceptionFilter } from 'src/utility/error-filters/notfound.filter';
import { YearsService } from 'src/years/years.service';

@Controller('')
export class AdminController {
  constructor(private readonly yearsService: YearsService) {}

  @Get('')
  async home(@Req() req: any, @Res() res: Response) {
    if (req.isAuthenticated) {
      return res.render('dashboard/index.ejs', { baseUrl: req.baseUrl });
    } else {
      return res.redirect('/login');
    }
  }

  @Get('admin/dashboard')
  async dashboard(@Req() req: any, @Res() res: Response) {
    if (req.isAuthenticated) {
      return res.render('dashboard/index.ejs', { baseUrl: req.baseUrl });
    } else {
      return res.redirect('/login');
    }
  }

  @Get('admin/financial-years/listing')
  async yearsListing(@Req() req: any, @Res() res: Response) {
    if (req.isAuthenticated) {
      return res.render('dashboard/index.ejs', { baseUrl: req.baseUrl });
    } else {
      return res.redirect('/login');
    }
  }

  @Get('admin/albums/listing')
  async albumsListing(@Req() req: any, @Res() res: Response) {
    if (req.isAuthenticated) {
      return res.render('dashboard/index.ejs', { baseUrl: req.baseUrl });
    } else {
      return res.redirect('/login');
    }
  }
}
