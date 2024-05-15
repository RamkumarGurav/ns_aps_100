import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature(['Product'])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ProductsModule {}
