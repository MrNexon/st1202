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
import { ServerService } from './server.service';
import { ServerPublicInterface } from './interface/server-public.interface';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ServerPublicDto } from './server-public.dto';
import {
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiOkResponse,
  OmitType,
} from '@nestjs/swagger';
import { AuthJwtGuard } from '../auth/auth-jwt.guard';
import { UserService } from '../user/user.service';

@Controller('server')
export class ServerController {
  constructor(
    private serverService: ServerService,
    private userService: UserService,
  ) {}

  @Get('list')
  @ApiOkResponse({
    type: [OmitType(ServerPublicDto, ['stat_url'])],
  })
  async list(): Promise<Omit<ServerPublicDto, 'stat_url'>[]> {
    const servers = await this.serverService.servers({});
    return servers.map((server) => {
      const { stat_url, id, ...data } = server;
      return data;
    });
  }

  @Get('get/:name')
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth()
  async get(@Param('name') name: string): Promise<ServerPublicDto> {
    const server = await this.serverService.server({
      name: name,
    });
    const { id, ...data } = server;

    return {
      ...data,
    };
  }

  @Get('get')
  @UseGuards(AuthJwtGuard)
  async getAll() {
    return this.serverService.servers({});
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

    this.serverService.updateFields(data);
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

    return this.serverService.delete(Number(id));
  }
}
