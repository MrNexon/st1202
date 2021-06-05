import { ContentService } from './content.service';
import { UserService } from '../user/user.service';
export declare class ContentController {
    private contentService;
    private userService;
    constructor(contentService: ContentService, userService: UserService);
    get(): Promise<{}>;
    update(req: any, data: any): Promise<void>;
}
