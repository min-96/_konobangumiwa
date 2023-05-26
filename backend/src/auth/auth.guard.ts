import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Request as ExpressRequest } from 'express';
import { CustomException } from 'src/error/customException';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log("guard")
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    try {
      if (req.session["passport"].user) {
        console.log("Guard Success");
        return true;
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}


