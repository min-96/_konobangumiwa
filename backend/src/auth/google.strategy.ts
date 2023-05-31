import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile,OAuth2Strategy } from 'passport-google-oauth';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, "google") {
  constructor(configService: ConfigService, private prisma: PrismaService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: any,
  ) {

    let user = await this.prisma.user.findUnique({
      where: {
        googleId: profile.id,
      },
    });
  
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          displayName: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          pictureUrl: profile.photos[0].value,
        },
      });
    }
    console.log('User saved to session:', user);
    done(null, user);
  }
}
