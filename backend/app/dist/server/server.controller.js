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
exports.ServerController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const server_service_1 = require("./server.service");
const server_public_dto_1 = require("./server-public.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_jwt_guard_1 = require("../auth/auth-jwt.guard");
const user_service_1 = require("../user/user.service");
let ServerController = class ServerController {
    constructor(serverService, userService) {
        this.serverService = serverService;
        this.userService = userService;
    }
    async list() {
        const servers = await this.serverService.servers({});
        return servers.map((server) => {
            const { stat_url, id } = server, data = __rest(server, ["stat_url", "id"]);
            return data;
        });
    }
    async get(name) {
        const server = await this.serverService.server({
            name: name,
        });
        const { id } = server, data = __rest(server, ["id"]);
        return Object.assign({}, data);
    }
    async getAll() {
        return this.serverService.servers({});
    }
    async update(req, data) {
        const user = await this.userService.user({
            where: {
                id: req.user.id,
            },
        });
        if (!user.is_admin)
            throw new common_1.ForbiddenException('No admin');
        this.serverService.updateFields(data);
    }
    async delete(req, id) {
        const user = await this.userService.user({
            where: {
                id: req.user.id,
            },
        });
        if (!user.is_admin)
            throw new common_1.ForbiddenException('No admin');
        return this.serverService.delete(Number(id));
    }
};
__decorate([
    common_1.Get('list'),
    swagger_1.ApiOkResponse({
        type: [swagger_1.OmitType(server_public_dto_1.ServerPublicDto, ['stat_url'])],
    }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "list", null);
__decorate([
    common_1.Get('get/:name'),
    common_1.UseGuards(auth_jwt_guard_1.AuthJwtGuard),
    swagger_1.ApiBearerAuth(),
    openapi.ApiResponse({ status: 200, type: require("./server-public.dto").ServerPublicDto }),
    __param(0, common_1.Param('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "get", null);
__decorate([
    common_1.Get('get'),
    common_1.UseGuards(auth_jwt_guard_1.AuthJwtGuard),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "getAll", null);
__decorate([
    common_1.Post('update'),
    common_1.UseGuards(auth_jwt_guard_1.AuthJwtGuard),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Request()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "update", null);
__decorate([
    common_1.Get('delete/:id'),
    common_1.UseGuards(auth_jwt_guard_1.AuthJwtGuard),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "delete", null);
ServerController = __decorate([
    common_1.Controller('server'),
    __metadata("design:paramtypes", [server_service_1.ServerService,
        user_service_1.UserService])
], ServerController);
exports.ServerController = ServerController;
//# sourceMappingURL=server.controller.js.map