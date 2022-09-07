import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const decode = this.jwtService.decode(context.getArgs()[0].headers['authorization'].split(' ')[1]); //Pega o token e decodifica
        if (decode) return true;
        else return false
    }
}
