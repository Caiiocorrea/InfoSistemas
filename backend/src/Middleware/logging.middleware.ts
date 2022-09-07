import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    use(req: Request, res: Response, next: NextFunction) {
        try {
            let decode = this.jwtService.decode(req.headers['authorization'].split(' ')[1]);
            res.locals.user = decode;
            next();
        } catch (error) {
            throw new HttpException({ message: `Token expired` }, HttpStatus.UNAUTHORIZED)
        }
    }
}