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
exports.LauncherController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_jwt_guard_1 = require("../auth/auth-jwt.guard");
const launcher_service_1 = require("./launcher.service");
const user_service_1 = require("../user/user.service");
let LauncherController = class LauncherController {
    constructor(launcherService, userService) {
        this.launcherService = launcherService;
        this.userService = userService;
    }
    async get() {
        return this.launcherService.get();
    }
    async getAll() {
        return this.launcherService.getAll();
    }
    async update(req, data) {
        const user = await this.userService.user({
            where: {
                id: req.user.id,
            },
        });
        if (!user.is_admin)
            throw new common_1.ForbiddenException('No admin');
        this.launcherService.update(data);
    }
};
__decorate([
    common_1.Get('get'),
    openapi.ApiResponse({ status: 200, type: [require("./launcher.dto").LauncherDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LauncherController.prototype, "get", null);
__decorate([
    common_1.Get('getAll'),
    openapi.ApiResponse({ status: 200, type: [require("./launcher.dto").LauncherDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LauncherController.prototype, "getAll", null);
__decorate([
    common_1.Post('update'),
    common_1.UseGuards(auth_jwt_guard_1.AuthJwtGuard),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Request()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LauncherController.prototype, "update", null);
LauncherController = __decorate([
    common_1.Controller('launcher'),
    __metadata("design:paramtypes", [launcher_service_1.LauncherService,
        user_service_1.UserService])
], LauncherController);
exports.LauncherController = LauncherController;
//# sourceMappingURL=launcher.controller.js.map