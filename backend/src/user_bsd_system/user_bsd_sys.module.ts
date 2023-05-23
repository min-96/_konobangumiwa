import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserBasedSystemResolver } from './user_bsd_sys.resolver';
import { UserBasedSystemService } from './user_bsd_sys.service';

@Module({
  providers: [PrismaService, UserBasedSystemResolver , UserBasedSystemService],
})
export class UserBasedSystemModule {}
