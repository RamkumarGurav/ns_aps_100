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
import { YearsService } from './years.service';

@Controller('financial-years')
export class YearsController {
  constructor(private readonly yearsService: YearsService) {}

  @Get('')
  async dashboard(@Req() req: any, @Res() res: Response) {
    if (req.isAuthenticated) {
    } else {
      return res.redirect('/auth/login');
    }
  }
}
