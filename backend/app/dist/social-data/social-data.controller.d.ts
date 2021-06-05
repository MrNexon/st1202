import { SocialDataService } from './social-data.service';
import { SocialDto } from './social.dto';
import { UserService } from '../user/user.service';
export declare class SocialDataController {
    private socialDataService;
    private userService;
    constructor(socialDataService: SocialDataService, userService: UserService);
    get(): Promise<SocialDto[]>;
    update(req: any, data: any): Promise<void>;
    delete(req: any, id: string): Promise<import(".prisma/client").SocialData>;
}
