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
    ReviewModule
  ],
  providers: [AppResolver]
})
export class AppModule {}
