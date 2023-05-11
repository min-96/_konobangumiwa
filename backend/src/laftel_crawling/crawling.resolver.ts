import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PrismaService } from 'prisma/prisma.service';
import { CrawlingService } from './crawling.service';

@Resolver()
export class CrawlingResolver {
  constructor(private prisma: PrismaService, private crawlingService: CrawlingService) {}

  @Query(()=> String)
  async test(): Promise<any> {
    return this.crawlingService.fetchData();
  }
  
}