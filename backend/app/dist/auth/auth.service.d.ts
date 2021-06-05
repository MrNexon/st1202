import { HttpService } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthLoginResponseDto } from './dto/auth-login-response.dto';
import { AuthRegDto } from './dto/auth-reg.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    private httpService;
    constructor(userService: UserService, jwtService: JwtService, httpService: HttpService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: User): Promise<AuthLoginResponseDto>;
    validateRecaptcha(token: string): Promise<boolean>;
    createUser(authRegDto: AuthRegDto): Promise<void>;
}
