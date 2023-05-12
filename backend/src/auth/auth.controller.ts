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
    try{
    req.session["passport"] = {
      user: req.user,
    };
    res.status(200).send('login Success');
  }catch(error){
    res.status(401).send({ error: 'login fail' });
  }
   // TODO : 추후 main 으로 redirect
  }

  @Get()
  test(@Req() req : Request ) {
    console.log(req.session);
    return 'OK';
  }

  @Get('/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send('Error logging out');
        return;
      }
      res.status(200).send('login Success');
   // TODO : 추후 main 으로 redirect
  });
}
  
}
