import { Launcher } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class LauncherService {
    private prisma;
    constructor(prisma: PrismaService);
    get(): Promise<Launcher[]>;
    getAll(): Promise<Launcher[]>;
    update(l: Launcher[]): void;
}
