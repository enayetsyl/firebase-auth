"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.AuthService = void 0;
const admin = __importStar(require("firebase-admin"));
const AppError_1 = __importDefault(require("../../../shared/AppError"));
const loginUser = (idToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verify the ID token first
        yield admin.auth().verifyIdToken(idToken);
        // Create session cookie (valid for 5 days)
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const sessionCookie = yield admin.auth().createSessionCookie(idToken, { expiresIn });
        return {
            sessionCookie,
            expiresIn,
        };
    }
    catch (error) {
        throw new AppError_1.default(401, 'Invalid or expired token');
    }
});
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRecord = yield admin.auth().createUser({
            email: payload.email,
            password: payload.password,
            displayName: payload.displayName,
        });
        return {
            uid: userRecord.uid,
        };
    }
    catch (error) {
        throw new AppError_1.default(400, error.message || 'Error creating user');
    }
});
const refreshToken = (sessionCookie) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield admin.auth().verifySessionCookie(sessionCookie, true);
        return {
            message: 'Session is valid',
        };
    }
    catch (error) {
        throw new AppError_1.default(401, 'Invalid session');
    }
});
exports.AuthService = {
    loginUser,
    registerUser,
    refreshToken,
};
