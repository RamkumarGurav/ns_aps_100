import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { YearsModule } from 'src/years/years.module';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundExceptionFilter } from 'src/utility/error-filters/notfound.filter';
@Module({
  imports: [YearsModule],
  controllers: [AdminController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
})
export class AdminModule {}
