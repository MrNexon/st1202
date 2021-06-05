import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    user(params: {
        where: Prisma.UserWhereUniqueInput;
    }): Prisma.Prisma__UserClient<User>;
    usersCount(): Promise<number>;
    createUser(data: Prisma.UserCreateInput): Prisma.Prisma__UserClient<User>;
    update(user: User): Prisma.Prisma__UserClient<User>;
}
