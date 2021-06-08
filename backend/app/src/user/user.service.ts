import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, user } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  user(params: { where: Prisma.userWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.user.findUnique({
      where: where,
    });
  }

  usersCount() {
    return this.prisma.user.count();
  }

  createUser(data: Prisma.userCreateInput) {
    return this.prisma.user.create({
      data: data,
    });
  }

  update(user: user) {
    const { id, ...data } = user;
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }
}
