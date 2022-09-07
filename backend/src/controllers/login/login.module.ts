import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginSchema } from '../../models/login.model';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      privateKey: 'SXJHkn7mFWsMS',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{
      name: 'Login', schema: LoginSchema,
    }])
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
  exports: [LoginService, JwtModule],
})
export class LoginModule { }
