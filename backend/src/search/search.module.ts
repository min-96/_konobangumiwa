import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { MyElasticSearchService } from 'src/elasticSearch/elasticSearch.service';
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
  providers: [PrismaService, SearchResolver, SearchService, MyElasticSearchService],
})
export class SearchModule {}
