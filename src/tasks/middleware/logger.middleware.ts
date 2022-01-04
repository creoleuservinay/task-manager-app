import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleWare implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        if (false) {
            throw new UnauthorizedException('User not authorise to acccess this route');
        } else {
            next();
        }
    }
}