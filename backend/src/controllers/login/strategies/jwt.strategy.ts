import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MessagesHelper } from '../../../helpers/messages.helper';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginService } from '../login.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private loginService: LoginService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.loginService.validateUser(payload.Id, payload.Email);
    if (!user) throw new HttpException({ message: MessagesHelper.MESSAGE_500 }, HttpStatus.INTERNAL_SERVER_ERROR)
    return user ? true : false;
  }
}
