import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MyElasticSearchModule } from 'src/elasticSearch/elasticSearch.module';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'), 
      }),
      inject: [ConfigService], 
    }),
    MyElasticSearchModule
 ],
  providers: [PrismaService, SearchResolver, SearchService],
})
export class SearchModule {}
