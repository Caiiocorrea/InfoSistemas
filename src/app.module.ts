import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { VeiculosModule } from './controllers/veiculos/veiculos.module';
import { LoggingMiddleware } from './Middleware/logging.middleware';
import { LoginModule } from './controllers/login/login.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGOURI),
    VeiculosModule,
    LoginModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .exclude({ path: 'api/v1/login', method: RequestMethod.POST })
      .forRoutes
  }
}