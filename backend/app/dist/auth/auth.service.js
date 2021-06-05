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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService, httpService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.httpService = httpService;
    }
    async validateUser(username, pass) {
        const user = await this.userService.user({
            where: {
                nickname: username,
            },
        });
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { nickname: user.nickname, id: user.id };
        return {
            User: Object.assign(Object.assign({}, user), { uuid: 'no implement' }),
            access_token: this.jwtService.sign(payload),
        };
    }
    async validateRecaptcha(token) {
        return new Promise((resolve) => {
            this.httpService
                .post(`https://www.google.com/recaptcha/api/siteverify?secret=6Lct68saAAAAAKSUaOkVCOVAN30wGONz0UDbSUpZ&response=${token}`)
                .subscribe((data) => {
                resolve(data.data.success);
            });
        });
    }
    async createUser(authRegDto) {
        const hash = await bcrypt.hash(authRegDto.password, 10);
        try {
            await this.userService.createUser({
                nickname: authRegDto.username,
                password: hash,
                email: authRegDto.email,
                balance: 0,
            });
        }
        catch (e) {
            throw new common_1.HttpException('Такой пользователь уже существует', 402);
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        common_1.HttpService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map