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
exports.SocialDataController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const social_data_service_1 = require("./social-data.service");
const auth_jwt_guard_1 = require("../auth/auth-jwt.guard");
const user_service_1 = require("../user/user.service");
let SocialDataController = class SocialDataController {
    constructor(socialDataService, userService) {
        this.socialDataService = socialDataService;
        this.userService = userService;
    }
    async get() {
        return this.socialDataService.socialsData();
    }
    async update(req, data) {
        const user = await this.userService.user({
            where: {
                id: req.user.id,
            },
        });
        if (!user.is_admin)
            throw new common_1.ForbiddenException('No admin');
        this.socialDataService.updateFields(data);
    }
    async delete(req, id) {
        const user = await this.userService.user({
            where: {
                id: req.user.id,
            },
        });
        if (!user.is_admin)
            throw new common_1.ForbiddenException('No admin');
        return this.socialDataService.delete(Number(id));
    }
};
__decorate([
    common_1.Get('get'),
    openapi.ApiResponse({ status: 200, type: [require("./social.dto").SocialDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SocialDataController.prototype, "get", null);
__decorate([
    common_1.Post('update'),
    common_1.UseGuards(auth_jwt_guard_1.AuthJwtGuard),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Request()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SocialDataController.prototype, "update", null);
__decorate([
    common_1.Get('delete/:id'),
    common_1.UseGuards(auth_jwt_guard_1.AuthJwtGuard),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SocialDataController.prototype, "delete", null);
SocialDataController = __decorate([
    common_1.Controller('social'),
    __metadata("design:paramtypes", [social_data_service_1.SocialDataService,
        user_service_1.UserService])
], SocialDataController);
exports.SocialDataController = SocialDataController;
//# sourceMappingURL=social-data.controller.js.map