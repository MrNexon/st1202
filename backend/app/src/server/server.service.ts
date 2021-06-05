import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Server } from '@prisma/client';
import { SocialDto } from '../social-data/social.dto';

@Injectable()
export class ServerService {
  constructor(private prisma: PrismaService) {}

  async server(where: Prisma.ServerWhereUniqueInput): Promise<Server> {
    return this.prisma.server.findUnique({
      where: where,
    });
  }

  async servers(params: {
    where?: Prisma.ServerWhereInput;
  }): Promise<Server[]> {
    const { where } = params;
    return this.prisma.server.findMany({
      where,
    });
  }

  update(server: Server) {
    const { id, ...data } = server;
    return this.prisma.server.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  updateFields(object: Server[]) {
    object.forEach(async (s) => {
      if (s.name !== '') {
        const { id, ...data } = s;
        await this.prisma.server.upsert({
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
    return this.prisma.server.delete({
      where: {
        id: id,
      },
    });
  }
}
