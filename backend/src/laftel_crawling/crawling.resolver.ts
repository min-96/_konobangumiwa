import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PrismaService } from 'prisma/prisma.service';
import { CrawlingService } from './crawling.service';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/auth.admin.guard';


@Resolver()
export class CrawlingResolver {
  constructor(private prisma: PrismaService, private crawlingService: CrawlingService) {}

  @Query(()=> String)
  @UseGuards(AdminGuard)
  async crawling_test(): Promise<string> {
    return this.crawlingService.fetchData();
  }
  
}