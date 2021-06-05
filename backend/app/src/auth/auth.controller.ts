import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthLocalGuard } from './auth-local.guard';
import { AuthService } from './auth.service';
import { AuthLoginResponseDto } from './dto/auth-login-response.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import {
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { AuthRegDto } from './dto/auth-reg.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthLocalGuard)
  async login(
    @Request() req,
    @Body() authLoginDto: AuthLoginDto,
  ): Promise<AuthLoginResponseDto> {
    return this.authService.login(req.user);
  }

  /*@Get('uuid/:uuid')
  @ApiDefaultResponse({
    description: 'Проверка uuid. Еще не допилен',
  })
  async uuid(): Promise<boolean> {
    return false;
  }*/

  @Post('reg')
  async reg(@Body() authRegDto: AuthRegDto) {
    console.log(authRegDto);
    if (!(await this.authService.validateRecaptcha(authRegDto.recaptcha_token)))
      throw new UnauthorizedException('Проверка reCaptcha не пройдена!');

    return await this.authService.createUser(authRegDto);
  }
}
