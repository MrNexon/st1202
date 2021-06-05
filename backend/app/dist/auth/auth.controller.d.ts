import { AuthService } from './auth.service';
import { AuthLoginResponseDto } from './dto/auth-login-response.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegDto } from './dto/auth-reg.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any, authLoginDto: AuthLoginDto): Promise<AuthLoginResponseDto>;
    reg(authRegDto: AuthRegDto): Promise<void>;
}
