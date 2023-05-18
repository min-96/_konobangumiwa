import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { MyElasticSearchService } from './elasticSearch.service';
import { MyElasticSearchResolver } from './elasticSearch.resolver';

@Module({
  imports: [ 
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
 ],

  providers: [PrismaService, MyElasticSearchService,MyElasticSearchResolver ],
})
export class MyElasticSearchModule {}
