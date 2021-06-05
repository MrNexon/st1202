import {
  Controller,
  Get,
  UseGuards,
  Request,
  Response,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthJwtGuard } from '../auth/auth-jwt.guard';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, OmitType } from '@nestjs/swagger';
import { UserLoginDto } from '../auth/dto/user-login.dto';
import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContentService } from '../contents/content.service';
const sizeOf = require('image-size');

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private contentService: ContentService,
  ) {}

  @UseGuards(AuthJwtGuard)
  @Get('get')
  @ApiBearerAuth()
  async get(@Request() req): Promise<UserLoginDto> {
    const { password, ...user } = await this.userService.user({
      where: {
        id: req.user.id,
      },
    });

    return {
      ...user,
      uuid: '1b466391-951a-4ed4-a96f-63791b68925d',
    };
  }

  @Get('count')
  async count() {
    return this.userService.usersCount();
  }

  @Get(':name/skin/:timestamp')
  async getSkin(@Param('name') username, @Response() res) {
    let fileContent = fs.createReadStream('./files/skins/default.png');

    if (fs.existsSync(`./files/skins/${username}.png`))
      fileContent = fs.createReadStream(`./files/skins/${username}.png`);

    return fileContent.pipe(res);
  }

  @Get(':name/cloak/:timestamp')
  async getCloak(@Param('name') username, @Response() res) {
    if (fs.existsSync(`./files/cloaks/${username}.png`)) {
      let fileContent = fs.createReadStream(`./files/cloaks/${username}.png`);
      return fileContent.pipe(res);
    }

    return false;
  }

  @Post(':nickname/addBalance/:amount')
  async addBalance(@Param('nickname') nickname, @Param('amount') amount) {
    ///TODO Implement check payment

    const user = await this.userService.user({
      where: {
        nickname: nickname,
      },
    });

    user.balance += Number(amount);
    await this.userService.update(user);
  }

  async oddBalance(user: User, amount: number) {
    if (user.balance - Number(amount) < 0)
      throw new BadRequestException('No balance');

    user.balance -= Number(amount);
    await this.userService.update(user);
  }

  @Get('unlock/:type')
  @UseGuards(AuthJwtGuard)
  async unlock(@Param('type') type, @Request() req) {
    const user = await this.userService.user({
      where: {
        id: req.user.id,
      },
    });

    console.log(type);
    switch (type) {
      case 'hd_skin':
        const skin = await this.contentService.content({
          name: 'priceHdSkin',
        });
        await this.oddBalance(user, Number(skin.value));
        user.hd_skin_unlock = true;
        break;
      case 'cloak':
        const cloak = await this.contentService.content({
          name: 'priceCloak',
        });
        await this.oddBalance(user, Number(cloak.value));
        user.cloak_unlock = true;
        break;
    }

    await this.userService.update(user);
  }

  @UseGuards(AuthJwtGuard)
  @Post('upload/:type')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSkin(
    @Param('type') type,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const user = await this.userService.user({
      where: {
        id: req.user.id,
      },
    });

    if (file.mimetype !== 'image/png')
      throw new BadRequestException('Неверный тип файла!');

    const dimensions = sizeOf(file.buffer);
    const aspect = dimensions.width / dimensions.height;
    if (aspect !== 1 && aspect !== 2)
      throw new BadRequestException('Файл неверного формата!');

    let fileType = '';
    switch (type) {
      case 'skin':
        if (dimensions.width > 64 || dimensions.height > 64)
          throw new BadRequestException('Слишком большой скин');
        fileType = 'skins';
        break;
      case 'hd_skin':
        if (!user.hd_skin_unlock)
          throw new BadRequestException('Загрузка HD скина недоступна');
        fileType = 'skins';
        break;
      case 'cloak':
        if (!user.cloak_unlock)
          throw new BadRequestException('Загрузка плаща недоступна');
        if (aspect !== 2) throw new BadRequestException('Неверный тип плаща');
        fileType = 'cloaks';
        break;
      default:
        throw new BadRequestException('Неверный тип файла!');
    }

    const ws = fs.createWriteStream(`./files/${fileType}/${user.nickname}.png`);
    ws.write(file.buffer);
  }
}
