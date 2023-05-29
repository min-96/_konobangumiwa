import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from 'prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CrawlingModule } from './laftel_crawling/crawling.module';
import { SearchModule } from './search/search.module';
import { ReviewModule } from './review/review.module';
import { AnimationModule } from './animation/animation.module';
import { WishModule } from './wish/wish.module';
import { MyElasticSearchModule } from './elasticSearch/elasticSearch.module';
import { UserBasedSystemModule } from './user_bsd_system/user_bsd_sys.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './error/errorHandler';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    //GenreTypeModule
    CrawlingModule,
    SearchModule,
    ReviewModule,
    AnimationModule,
    WishModule,
    MyElasticSearchModule,
    UserBasedSystemModule,
    TestModule,
  ],
  providers: [AppResolver,
  {
    provide: APP_FILTER,
    useClass: CustomExceptionFilter,
  }],
})
export class AppModule { }
