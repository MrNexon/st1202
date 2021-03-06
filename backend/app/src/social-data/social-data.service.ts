import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SocialDto } from './social.dto';

@Injectable()
export class SocialDataService {
  constructor(private prisma: PrismaService) {}

  async socialsData() {
    return this.prisma.socialdata.findMany({});
  }

  updateFields(object: SocialDto[]) {
    object.forEach(async (s) => {
      if (s.link !== '') {
        const { id, ...data } = s;
        await this.prisma.socialdata.upsert({
          where: {
            id: id,
          },
          update: {
            ...data,
          },
          create: {
            ...data,
          },
        });
      }
    });
  }

  delete(id: number) {
    return this.prisma.socialdata.delete({
      where: {
        id: id,
      },
    });
  }
}
