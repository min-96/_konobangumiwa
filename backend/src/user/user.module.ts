import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  providers: [UserService, UserResolver, PrismaService,AuthGuard],
  exports: [UserService],

})
export class UserModule {}
