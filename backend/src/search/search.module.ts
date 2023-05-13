import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AnimationService } from 'src/animation/animation.service';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';

@Module({
  providers: [ PrismaService, SearchResolver, SearchService],
 // exports: [UserService],

})
export class SearchModule {}
