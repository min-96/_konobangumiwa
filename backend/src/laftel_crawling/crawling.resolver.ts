import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { PrismaService } from 'prisma/prisma.service';
import { CrawlingService } from './crawling.service';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/auth.admin.guard';


@Resolver()
export class CrawlingResolver {
  constructor(private prisma: PrismaService, private crawlingService: CrawlingService) {}

  @Query(()=> String)
  async crawling_test(@Args('offset',{type: ()=> Int})offset: number,
  @Args('size',{type : ()=> Int})size: number,
  @Args('userSize', {type: ()=> Int}) userSize: number,
  ): Promise<string> {
    return this.crawlingService.fetchData(offset,size,userSize);
  }
  
}