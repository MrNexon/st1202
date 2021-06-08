import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  UnauthorizedException, HttpCode, Param, Query,
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
import {ServerJoinDto} from "./dto/server-join.dto";
import {AuthJwtInbodyGuard} from "./auth-jwt-inbody.guard";
import {AuthHasJoinDto} from "./dto/auth-has-join.dto";

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
    if (!(await this.authService.validateRecaptcha(authRegDto.recaptcha_token)))
      throw new UnauthorizedException('Проверка reCaptcha не пройдена!');

    return await this.authService.createUser(authRegDto);
  }

  @Post('join')
  @HttpCode(204)
  @UseGuards(AuthJwtInbodyGuard)
  async joinServer(@Body() serverJoinDto: ServerJoinDto) {
    await this.authService.connectServer(serverJoinDto.selectedProfile, serverJoinDto.serverId)
  }

  @Get('hasJoin')
  async hasJoin(@Query('username') username: string, @Query('serverId') serverId): Promise<AuthHasJoinDto> {
    const user = await this.authService.hasJoin(username, serverId);
    const prop = {
      timestamp: Number.parseInt(String(new Date().getTime() / 1000)),
      profileId: user.uuid,
      profileName: user.nickname,
      textures: {
        "SKIN": {
          "url": `/api/user/${user.nickname}/skin`
        },
        "CAPE": {
          "url": `/api/user/${user.nickname}/cloak`
        }
      }
    }

    return {
      id: user.uuid,
      name: user.nickname,
      properties: [
        {
          name: 'textures',
          value: Buffer.from(JSON.stringify(prop)).toString('base64')
        }
      ]
    }
  }
}
