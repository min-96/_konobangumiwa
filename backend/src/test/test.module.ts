import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { TestResolver } from './test.resolver';
import { TestSerive } from './test.service';

@Module({
  providers: [PrismaService,TestResolver, TestSerive],
})
export class TestModule {}
