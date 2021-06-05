"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_jwt_guard_1 = require("../auth/auth-jwt.guard");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const fs = require("fs");
const platform_express_1 = require("@nestjs/platform-express");
const content_service_1 = require("../contents/content.service");
const sizeOf = require('image-size');
let UserController = class UserController {
    constructor(userService, contentService) {
        this.userService = userService;
        this.contentService = contentService;
    }
    async get(req) {
        const _a = await this.userService.user({
            where: {
                id: req.user.id,
            },
        }), { password } = _a, user = __rest(_a, ["password"]);
        return Object.assign(Object.assign({}, user), { uuid: '1b466391-951a-4ed4-a96f-63791b68925d' });
    }
    async count() {
        return this.userService.usersCount();
    }
    async getSkin(username, res) {
        let fileContent = fs.createReadStream('./files/skins/default.png');
        if (fs.existsSync(`./files/skins/${username}.png`))
            fileContent = fs.createReadStream(`./files/skins/${username}.png`);
        return fileContent.pipe(res);
    }
    async getCloak(username, res) {
        if (fs.existsSync(`./files/cloaks/${username}.png`)) {
            let fileContent = fs.createReadStream(`./files/cloaks/${username}.png`);
            return fileContent.pipe(res);
        }
        return false;
    }
    async addBalance(nickname, amount) {
        const user = await this.userService.user({
            where: {
                nickname: nickname,
            },
        });
        user.balance += Number(amount);
        await this.userService.update(user);
    }
    async oddBalance(user, amount) {
        if (user.balance - Number(amount) < 0)
            throw new common_1.BadRequestException('No balance');
        user.balance -= Number(amount);
        await this.userService.update(user);
    }
    async unlock(type, req) {
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
    async uploadSkin(type, file, req) {
        const user = await this.userService.user({
            where: {
                id: req.user.id,
            },
        });
        if (file.mimetype !== 'image/png')
            throw new common_1.BadRequestException('Неверный тип файла!');
        const dimensions = sizeOf(file.buffer);
        const aspect = dimensions.width / dimensions.height;
        if (aspect !== 1 && aspect !== 2)
            throw new common_1.BadRequestException('Файл неверного формата!');
        let fileType = '';
        switch (type) {
            case 'skin':
                if (dimensions.width > 64 || dimensions.height > 64)
                    throw new common_1.BadRequestException('Слишком большой скин');
                fileType = 'skins';
                break;
            case 'hd_skin':
                if (!user.hd_skin_unlock)
                    throw new common_1.BadRequestException('Загрузка HD скина недоступна');
                fileType = 'skins';
                break;
            case 'cloak':
                if (!user.cloak_unlock)
                    throw new common_1.BadRequestException('Загрузка плаща недоступна');
                if (aspect !== 2)
                    throw new common_1.BadRequestException('Неверный тип плаща');
                fileType = 'cloaks';
                break;
            default:
                throw new common_1.BadRequestException('Неверный тип файла!');
        }
        const ws = fs.createWriteStream(`./files/${fileType}/${user.nickname}.png`);
        ws.write(file.buffer);
    }
};
__decorate([
    common_1.UseGuards(auth_jwt_guard_1.AuthJwtGuard),
    common_1.Get('get'),
    swagger_1.ApiBearerAuth(),
    openapi.ApiResponse({ status: 200, type: require("../auth/dto/user-login.dto").UserLoginDto }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    common_1.Get('count'),
    openapi.ApiResponse({ status: 200, type: Number }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "count", null);
__decorate([
    common_1.Get(':name/skin/:timestamp'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('name')), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getSkin", null);
__decorate([
    common_1.Get(':name/cloak/:timestamp'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('name')), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCloak", null);
__decorate([
    common_1.Post(':nickname/addBalance/:amount'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Param('nickname')), __param(1, common_1.Param('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addBalance", null);
__decorate([
    common_1.Get('unlock/:type'),
    common_1.UseGuards(auth_jwt_guard_1.AuthJwtGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Param('type')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unlock", null);
__decorate([
    common_1.UseGuards(auth_jwt_guard_1.AuthJwtGuard),
    common_1.Post('upload/:type'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Param('type')),
    __param(1, common_1.UploadedFile()),
    __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadSkin", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        content_service_1.ContentService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map