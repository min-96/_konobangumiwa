import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { PrismaService } from 'prisma/prisma.service';
import { CrawlingService } from './crawling.service';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/auth.admin.guard';


@Resolver()
export class CrawlingResolver {
  constructor(private prisma: PrismaService, private crawlingService: CrawlingService) {}

  @Query(()=> String)
  async crawling_animation(@Args('offset',{type: ()=> Int})offset: number,
  @Args('size',{type : ()=> Int})size: number): Promise<string> {
    return this.crawlingService.fetchDataAllProcess(offset,size);
  }


  @Query(()=> String)
  async crawling_review(@Args('userSize',{type: ()=> Int})userSize: number,
  @Args('reviewSize',{type: ()=> Int})reviewSize: number): Promise<string> {
    return this.crawlingService.fetchAllDataReview(userSize,reviewSize);
  }



  @Query(()=> String)
  async crawling_review2(@Args('animationId',{type: ()=> Int})animationId: number,
    @Args('userSize',{type: ()=> Int})userSize: number,
  @Args('reviewSize',{type: ()=> Int})reviewSize: number): Promise<string> {
    return this.crawlingService.fetchDataReview(animationId,reviewSize,userSize);
  }
  
  
}