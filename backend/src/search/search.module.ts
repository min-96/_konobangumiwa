import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { MyElasticSearchService } from 'src/elasticSearch/elasticSearch.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
 ],
  providers: [PrismaService, SearchResolver, SearchService, MyElasticSearchService],
})
export class SearchModule {}
