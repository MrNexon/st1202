"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialDto = void 0;
const openapi = require("@nestjs/swagger");
class SocialDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, type: { required: true, type: () => String }, header: { required: true, type: () => String }, button_text: { required: true, type: () => String }, link: { required: true, type: () => String }, display_block: { required: true, type: () => Boolean }, display_footer: { required: true, type: () => Boolean } };
    }
}
exports.SocialDto = SocialDto;
//# sourceMappingURL=social.dto.js.map