"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        idToken: zod_1.z.string().min(1, { message: 'ID Token is required' }),
    }),
});
const registerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: 'Invalid email address' }),
        password: zod_1.z.string().min(6, { message: 'Password must be at least 6 characters' }),
        displayName: zod_1.z.string().min(1, { message: 'Display name is required' }),
    }),
});
exports.AuthValidation = {
    loginZodSchema,
    registerZodSchema,
};
