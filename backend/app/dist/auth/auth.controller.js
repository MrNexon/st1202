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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_local_guard_1 = require("./auth-local.guard");
const auth_service_1 = require("./auth.service");
const auth_login_dto_1 = require("./dto/auth-login.dto");
const auth_reg_dto_1 = require("./dto/auth-reg.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, authLoginDto) {
        return this.authService.login(req.user);
    }
    async reg(authRegDto) {
        console.log(authRegDto);
        if (!(await this.authService.validateRecaptcha(authRegDto.recaptcha_token)))
            throw new common_1.UnauthorizedException('Проверка reCaptcha не пройдена!');
        return await this.authService.createUser(authRegDto);
    }
};
__decorate([
    common_1.Post('login'),
    common_1.UseGuards(auth_local_guard_1.AuthLocalGuard),
    openapi.ApiResponse({ status: 201, type: require("./dto/auth-login-response.dto").AuthLoginResponseDto }),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_login_dto_1.AuthLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    openapi.ApiOperation({ description: "@Get('uuid/:uuid')\n\n    description: '\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 uuid. \u0415\u0449\u0435 \u043D\u0435 \u0434\u043E\u043F\u0438\u043B\u0435\u043D',\n  })\n  async uuid(): Promise<boolean> {\n    return false;\n  }" }),
    common_1.Post('reg'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_reg_dto_1.AuthRegDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "reg", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map