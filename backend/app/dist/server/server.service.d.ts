import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Server } from '@prisma/client';
export declare class ServerService {
    private prisma;
    constructor(prisma: PrismaService);
    server(where: Prisma.ServerWhereUniqueInput): Promise<Server>;
    servers(params: {
        where?: Prisma.ServerWhereInput;
    }): Promise<Server[]>;
    update(server: Server): Prisma.Prisma__ServerClient<Server>;
    updateFields(object: Server[]): void;
    delete(id: number): Prisma.Prisma__ServerClient<Server>;
}
