import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class Serializer extends PassportSerializer {
  constructor(private prisma: PrismaService) {
    super();
  }


serializeUser(user: any, done: (err: any, id?: any) => void): void {
  console.log("serializeUser");
    done(null, user);
  }
deserializeUser(payload: any, done: (err: any, id?: any) => void): void {
  console.log("deserializeUser")
    done(null, payload);
  }
}
