import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthLoginResponseDto } from './dto/auth-login-response.dto';
import { AuthRegDto } from './dto/auth-reg.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.user({
      where: {
        nickname: username,
      },
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<AuthLoginResponseDto> {
    const payload = { nickname: user.nickname, id: user.id };
    return {
      User: {
        ...user,
        uuid: 'no implement',
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateRecaptcha(token: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.httpService
        .post(
          `https://www.google.com/recaptcha/api/siteverify?secret=6Lct68saAAAAAKSUaOkVCOVAN30wGONz0UDbSUpZ&response=${token}`,
        )
        .subscribe((data) => {
          resolve(data.data.success);
        });
    });
  }

  async createUser(authRegDto: AuthRegDto) {
    const hash = await bcrypt.hash(authRegDto.password, 10);
    try {
      await this.userService.createUser({
        nickname: authRegDto.username,
        password: hash,
        email: authRegDto.email,
        balance: 0,
      });
    } catch (e) {
      throw new HttpException('Такой пользователь уже существует', 402);
    }
  }
}
