import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  ForbiddenException,
  Body,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { AuthJwtGuard } from '../auth/auth-jwt.guard';
import { UserService } from '../user/user.service';

@Controller('content')
export class ContentController {
  constructor(
    private contentService: ContentService,
    private userService: UserService,
  ) {}
  @Get('get')
  async get() {
    const values = await this.contentService.contents({});
    const ret = {};
    values.forEach((vale) => (ret[vale.name] = vale.value));
    return ret;
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

    this.contentService.updateFields(data);
  }
}
