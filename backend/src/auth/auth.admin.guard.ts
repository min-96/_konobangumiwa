import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from "./auth.guard";
import { CustomException } from "src/error/customException";

@Injectable()
export class AdminGuard extends AuthGuard {
    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        const userRole = req.session['passport']?.user?.role;
       // return super.canActivate(context) && userRole === 'ADMIN';

        try{
            if(super.canActivate(context) && userRole === 'ADMIN'){
                console.log("ADMin Guard Success");
                return true;
            }
        }catch (e) {
            throw new CustomException('관리자권한입니다.', 401);
        }
      }

}