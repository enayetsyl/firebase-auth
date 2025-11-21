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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getMyProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // In a real app, you might sync Firebase user to Postgres here if not exists
    // For now, we just return what we have or mock it if we haven't synced yet
    // Since we don't have a sync mechanism yet, let's assume we just return the firebase data passed to controller
    // But typically service interacts with DB.
    // Let's try to find in DB, if not, return null (or handle sync)
    // For this boilerplate, we'll just return the DB record
    // const result = await prisma.user.findUnique({
    //   where: {
    //     id: userId
    //   }
    // })
    // return result;
    return null;
});
exports.UserService = {
    getMyProfile,
};
