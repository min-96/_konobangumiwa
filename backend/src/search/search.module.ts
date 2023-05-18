import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
      // maxRetries: 3, // 요청 실패 시 재시도할 횟수
      // requestTimeout: 60000, // 요청 타임아웃 시간(밀리초)
      // sniffOnStart: false // 클라이언트가 시작될 때 클러스터의 노드를 자동으로 찾을지 여부
    }),
 ],

  providers: [PrismaService, SearchResolver, SearchService],
})
export class SearchModule {}
