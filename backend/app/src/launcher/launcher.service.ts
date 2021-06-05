import { Injectable } from '@nestjs/common';
import { Launcher } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LauncherService {
  constructor(private prisma: PrismaService) {}

  get() {
    return this.prisma.launcher.findMany({
      where: {
        display: true,
      },
    });
  }

  getAll() {
    return this.prisma.launcher.findMany({});
  }

  update(l: Launcher[]) {
    l.forEach(async (l) => {
      const { platform, ...data } = l;
      await this.prisma.launcher.update({
        where: {
          platform: platform,
        },
        data: {
          ...data,
        },
      });
    });
  }
}
