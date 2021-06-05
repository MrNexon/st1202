import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SocialDataService } from './social-data.service';
import { SocialDto } from './social.dto';
import { AuthJwtGuard } from '../auth/auth-jwt.guard';
import { UserService } from '../user/user.service';

@Controller('social')
export class SocialDataController {
  constructor(
    private socialDataService: SocialDataService,
    private userService: UserService,
  ) {}

  @Get('get')
  async get(): Promise<SocialDto[]> {
    return this.socialDataService.socialsData();
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

    this.socialDataService.updateFields(data);
  }

  @Get('delete/:id')
  @UseGuards(AuthJwtGuard)
  async delete(@Request() req, @Param('id') id: string) {
    const user = await this.userService.user({
      where: {
        id: req.user.id,
      },
    });

    if (!user.is_admin) throw new ForbiddenException('No admin');

    return this.socialDataService.delete(Number(id));
  }
}
