import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  contents(where: Prisma.contentWhereInput) {
    return this.prisma.content.findMany({
      where: where,
    });
  }

  content(where: Prisma.contentWhereUniqueInput) {
    return this.prisma.content.findUnique({
      where: where,
    });
  }

  updateFields(object: {}) {
    Object.entries(object).forEach(async (d) => {
      await this.prisma.content.update({
        where: {
          name: d[0],
        },
        data: {
          value: d[1],
        },
      });
    });
  }
}
