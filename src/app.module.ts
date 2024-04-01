import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './utility/common/http-error.filter';
import { AuthModule } from './auth/auth.module';
import { UrlCatcherMiddleware } from './utility/middlewares/url-catcher.middleware';
import { AuthMiddleware } from './utility/middlewares/auth.middleware';
import { AdminModule } from './admin/admin.module';
import { NotFoundExceptionFilter } from './utility/error-filters/notfound.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ns_aps_100_db',
      entities: [User],
      synchronize: true,
      timezone: 'Asia/Kolkata',
    }),
    AdminModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: NotFoundExceptionFilter,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpErrorFilter,
    // },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UrlCatcherMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
