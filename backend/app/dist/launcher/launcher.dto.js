"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LauncherDto = void 0;
const openapi = require("@nestjs/swagger");
class LauncherDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { platform: { required: true, type: () => String }, link: { required: true, type: () => String }, display: { required: true, type: () => Boolean } };
    }
}
exports.LauncherDto = LauncherDto;
//# sourceMappingURL=launcher.dto.js.map