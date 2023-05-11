import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Request as ExpressRequest, Response } from 'express';
import { Session } from 'express-session';
//import { AppResolver } from 'src/app.resolver';

type Request = ExpressRequest & { session: Session}

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    console.log("authController");
    req.session["passport"] = {
      user: req.user,
    };
    res.redirect('/auth/login/success');
  }

  @Get()
  test(@Req() req : Request ) {
    console.log(req.session);
    return 'OK';
  }

  @Get('/login/success')
  loginSuccess(@Req() req : Request) {
    return 'Login Success';
  }

  @Get('/logout')
  logout(@Req() req) {
    req.logout();
    return 'Logout Success';
  }

  
}
