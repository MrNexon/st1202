import { LauncherService } from './launcher.service';
import { LauncherDto } from './launcher.dto';
import { UserService } from '../user/user.service';
export declare class LauncherController {
    private launcherService;
    private userService;
    constructor(launcherService: LauncherService, userService: UserService);
    get(): Promise<LauncherDto[]>;
    getAll(): Promise<LauncherDto[]>;
    update(req: any, data: any): Promise<void>;
}
