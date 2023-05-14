import { PrismaService } from 'prisma/prisma.service';
import { AnimationResolver } from './animation.resolver';
import { AnimationService } from './animation.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [PrismaService,AnimationResolver, AnimationService],
})
export class AnimationModule {}
