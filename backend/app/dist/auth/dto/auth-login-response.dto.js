"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginResponseDto = void 0;
const openapi = require("@nestjs/swagger");
class AuthLoginResponseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { User: { required: true, type: () => require("./user-login.dto").UserLoginDto }, access_token: { required: true, type: () => String, description: "JWT user token (further passed in header authorization: Bearer <token>)", example: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ.-xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM" } };
    }
}
exports.AuthLoginResponseDto = AuthLoginResponseDto;
//# sourceMappingURL=auth-login-response.dto.js.map