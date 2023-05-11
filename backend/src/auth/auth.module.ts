import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './google.strategy';
import { PrismaService } from 'prisma/prisma.service';
import { AuthController } from './auth.controller';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { Serializer } from './serializer';
import * as passport from 'passport';
import RedisStore from "connect-redis"
import { createClient } from 'redis';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google', session: true }),
    ConfigModule,
  ],
  providers: [GoogleStrategy, PrismaService, Serializer],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    const client = createClient(this.configService.get('REDIS_URL'));
    client.connect().catch(console.error);
    const store = new RedisStore({
      client: client,
      ttl: 30,
    });

    consumer
      .apply(
        cookieParser(this.configService.get('SESSION_SECRET')),
        session({
          secret: this.configService.get('SESSION_SECRET'),
          resave: false,
          store,
          saveUninitialized: false,
          cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
          },
        }),
        passport.initialize(),
        passport.session()
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
