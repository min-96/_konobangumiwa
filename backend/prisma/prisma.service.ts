import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient {
  private _engine: any;
  constructor() {
    super();
  }
}
