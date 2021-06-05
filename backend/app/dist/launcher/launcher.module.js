"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LauncherModule = void 0;
const common_1 = require("@nestjs/common");
const launcher_service_1 = require("./launcher.service");
const launcher_controller_1 = require("./launcher.controller");
const user_module_1 = require("../user/user.module");
let LauncherModule = class LauncherModule {
};
LauncherModule = __decorate([
    common_1.Module({
        providers: [launcher_service_1.LauncherService],
        controllers: [launcher_controller_1.LauncherController],
        imports: [user_module_1.UserModule],
    })
], LauncherModule);
exports.LauncherModule = LauncherModule;
//# sourceMappingURL=launcher.module.js.map