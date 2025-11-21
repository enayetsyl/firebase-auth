"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idToken } = req.body;
    const result = yield auth_service_1.AuthService.loginUser(idToken);
    // We don't set the cookie here because the proxy (Next.js) handles the actual cookie setting for the browser.
    // However, if we were hitting this directly from a client that supports cookies (and same domain), we could.
    // But the requirement is "Next api route to set token in the cookies and use proxy".
    // So we just return the session cookie to the Next.js API route.
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully',
        data: result,
    });
}));
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.registerUser(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'User created successfully',
        data: result,
    });
}));
const logoutUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('session');
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Logged out successfully',
        data: null,
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionCookie = req.cookies.session || '';
    if (!sessionCookie) {
        (0, sendResponse_1.default)(res, {
            statusCode: 401,
            success: false,
            message: 'No session cookie',
            data: null,
        });
        return;
    }
    const result = yield auth_service_1.AuthService.refreshToken(sessionCookie);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Session is valid',
        data: result,
    });
}));
exports.AuthController = {
    loginUser,
    registerUser,
    logoutUser,
    refreshToken,
};
