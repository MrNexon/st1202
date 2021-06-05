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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContentService = class ContentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    contents(where) {
        return this.prisma.content.findMany({
            where: where,
        });
    }
    content(where) {
        return this.prisma.content.findUnique({
            where: where,
        });
    }
    updateFields(object) {
        Object.entries(object).forEach(async (d) => {
            await this.prisma.content.update({
                where: {
                    name: d[0],
                },
                data: {
                    value: d[1],
                },
            });
        });
    }
};
ContentService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentService);
exports.ContentService = ContentService;
//# sourceMappingURL=content.service.js.map