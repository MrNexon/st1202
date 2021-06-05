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
exports.ContentController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const content_service_1 = require("./content.service");
const auth_jwt_guard_1 = require("../auth/auth-jwt.guard");
const user_service_1 = require("../user/user.service");
let ContentController = class ContentController {
    constructor(contentService, userService) {
        this.contentService = contentService;
        this.userService = userService;
    }
    async get() {
        const values = await this.contentService.contents({});
        const ret = {};
        values.forEach((vale) => (ret[vale.name] = vale.value));
        return ret;
    }
    async update(req, data) {
        const user = await this.userService.user({
            where: {
                id: req.user.id,
            },
        });
        if (!user.is_admin)
            throw new common_1.ForbiddenException('No admin');
        this.contentService.updateFields(data);
    }
};
__decorate([
    common_1.Get('get'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "get", null);
__decorate([
    common_1.Post('update'),
    common_1.UseGuards(auth_jwt_guard_1.AuthJwtGuard),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Request()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "update", null);
ContentController = __decorate([
    common_1.Controller('content'),
    __metadata("design:paramtypes", [content_service_1.ContentService,
        user_service_1.UserService])
], ContentController);
exports.ContentController = ContentController;
//# sourceMappingURL=content.controller.js.map