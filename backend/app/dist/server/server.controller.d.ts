import { ServerService } from './server.service';
import { ServerPublicDto } from './server-public.dto';
import { UserService } from '../user/user.service';
export declare class ServerController {
    private serverService;
    private userService;
    constructor(serverService: ServerService, userService: UserService);
    list(): Promise<Omit<ServerPublicDto, 'stat_url'>[]>;
    get(name: string): Promise<ServerPublicDto>;
    getAll(): Promise<import(".prisma/client").Server[]>;
    update(req: any, data: any): Promise<void>;
    delete(req: any, id: string): Promise<import(".prisma/client").Server>;
}
