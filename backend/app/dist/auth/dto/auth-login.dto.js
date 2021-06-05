"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginDto = void 0;
const openapi = require("@nestjs/swagger");
class AuthLoginDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String, description: "Username (nickname)", example: "TestUser" }, password: { required: true, type: () => String, description: "User password", example: "testPassword" } };
    }
}
exports.AuthLoginDto = AuthLoginDto;
//# sourceMappingURL=auth-login.dto.js.map