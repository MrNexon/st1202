"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerPublicDto = void 0;
const openapi = require("@nestjs/swagger");
class ServerPublicDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, description: "Server name", example: "Naruto World" }, description: { required: true, type: () => String, description: "Server Description", example: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435..." }, stat_url: { required: true, type: () => String, description: "Address", example: "192.186.0.0:25505" }, slots: { required: true, type: () => Number, description: "Number of slots", example: 100 }, online: { required: true, type: () => Number, description: "Current online", example: 3 }, icon_src: { required: true, type: () => String, description: "\u0418\u043A\u043E\u043D\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430", example: "url" } };
    }
}
exports.ServerPublicDto = ServerPublicDto;
//# sourceMappingURL=server-public.dto.js.map