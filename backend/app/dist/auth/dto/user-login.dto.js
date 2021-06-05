"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginDto = void 0;
const openapi = require("@nestjs/swagger");
class UserLoginDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { nickname: { required: true, type: () => String, description: "User nickname", example: "TestUser" }, email: { required: true, type: () => String, description: "User e-mail", example: "test_user@yandex.ru" }, balance: { required: true, type: () => Number, description: "User balance", example: 152.12 }, cloak_unlock: { required: true, type: () => Boolean, description: "CloakS available", example: true }, hd_skin_unlock: { required: true, type: () => Boolean, description: "HD skins available", example: false }, is_admin: { required: true, type: () => Boolean, description: "Is the user an administrator", example: false }, uuid: { required: true, type: () => String, description: "User UUID", example: "1b466391-951a-4ed4-a96f-63791b68925d" } };
    }
}
exports.UserLoginDto = UserLoginDto;
//# sourceMappingURL=user-login.dto.js.map