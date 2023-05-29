import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { MyElasticSearchService } from './elasticSearch.service';
import { MyElasticSearchResolver } from './elasticSearch.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
      }),
      inject: [ConfigService],
    }),
  ],

  providers: [PrismaService, MyElasticSearchService, MyElasticSearchResolver],
})
export class MyElasticSearchModule { }
