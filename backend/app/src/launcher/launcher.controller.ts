import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SocialDto } from '../social-data/social.dto';
import { AuthJwtGuard } from '../auth/auth-jwt.guard';
import { LauncherService } from './launcher.service';
import { LauncherDto } from './launcher.dto';
import { UserService } from '../user/user.service';

@Controller('launcher')
export class LauncherController {
  constructor(
    private launcherService: LauncherService,
    private userService: UserService,
  ) {}
  @Get('get')
  async get(): Promise<LauncherDto[]> {
    return this.launcherService.get();
  }

  @Get('getAll')
  async getAll(): Promise<LauncherDto[]> {
    return this.launcherService.getAll();
  }

  @Post('update')
  @UseGuards(AuthJwtGuard)
  async update(@Request() req, @Body() data) {
    const user = await this.userService.user({
      where: {
        id: req.user.id,
      },
    });

    if (!user.is_admin) throw new ForbiddenException('No admin');

    this.launcherService.update(data);
  }
}
