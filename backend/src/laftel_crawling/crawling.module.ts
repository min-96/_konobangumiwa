import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AdminGuard } from 'src/auth/auth.admin.guard';
import { CrawlingResolver } from './crawling.resolver';
import { CrawlingService } from './crawling.service';
import { GenreTypeService } from './data_genreType.service';
import { AnimationService } from './data_animation.service';

@Module({
  providers: [PrismaService, AdminGuard, CrawlingResolver,CrawlingService,GenreTypeService,AnimationService],
})
export class CrawlingModule {}