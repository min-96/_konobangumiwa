import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AnimationService } from 'src/animation/animation.service';
import { SearchResolver } from './\bsearch.resolver';

@Module({
  providers: [ PrismaService, SearchResolver, AnimationService],
 // exports: [UserService],

})
export class SearchModule {}
