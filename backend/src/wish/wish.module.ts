import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { WishResolver } from './wish.resover';
import { WishService } from './wish.service';

@Module({
  providers: [PrismaService,WishResolver, WishService],
})
export class WishModule {}