import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ContentService {
    private prisma;
    constructor(prisma: PrismaService);
    contents(where: Prisma.ContentWhereInput): Promise<import(".prisma/client").Content[]>;
    content(where: Prisma.ContentWhereUniqueInput): Prisma.Prisma__ContentClient<import(".prisma/client").Content>;
    updateFields(object: {}): void;
}
