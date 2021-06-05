/// <reference types="multer" />
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { UserLoginDto } from '../auth/dto/user-login.dto';
import { ContentService } from '../contents/content.service';
export declare class UserController {
    private userService;
    private contentService;
    constructor(userService: UserService, contentService: ContentService);
    get(req: any): Promise<UserLoginDto>;
    count(): Promise<number>;
    getSkin(username: any, res: any): Promise<any>;
    getCloak(username: any, res: any): Promise<any>;
    addBalance(nickname: any, amount: any): Promise<void>;
    oddBalance(user: User, amount: number): Promise<void>;
    unlock(type: any, req: any): Promise<void>;
    uploadSkin(type: any, file: Express.Multer.File, req: any): Promise<void>;
}
