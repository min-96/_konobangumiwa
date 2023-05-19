import { Module } from '@nestjs/common';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from './review.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [PrismaService,ReviewResolver, ReviewService],
})
export class ReviewModule {}
