import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Year } from './year.entity';
import { YearsService } from './years.service';
import { YearsController } from './years.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Year])],
  providers: [YearsService],
  controllers: [YearsController],
  exports: [YearsService],
})
export class YearsModule {}
