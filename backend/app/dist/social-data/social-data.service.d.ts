import { PrismaService } from '../prisma/prisma.service';
import { SocialDto } from './social.dto';
export declare class SocialDataService {
    private prisma;
    constructor(prisma: PrismaService);
    socialsData(): Promise<import(".prisma/client").SocialData[]>;
    updateFields(object: SocialDto[]): void;
    delete(id: number): import(".prisma/client").Prisma.Prisma__SocialDataClient<import(".prisma/client").SocialData>;
}
