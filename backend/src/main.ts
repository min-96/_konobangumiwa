import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as passport from 'passport';
//import { GoogleStrategy } from './auth/google.strategy';
import * as session from 'express-session';
import passport from 'passport';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //const googleStrategy = app.get(GoogleStrategy);
  const configService = app.get(ConfigService);
  console.log(configService.get('DATABASE_URL'));
  // app.use(
  //   session({
  //     secret: 'your-secret-key',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );
  
  // app.use(passport.initialize());
  // app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
