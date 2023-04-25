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
exports.updateCodeBlock = exports.getCodeBlockByTitle = exports.getAllCodeBlocks = void 0;
const CodeBlockModel_1 = require("../models/CodeBlockModel");
const getAllCodeBlocks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeBlocks = yield CodeBlockModel_1.CodeBlockModel.find();
        return codeBlocks;
    }
    catch (error) {
        throw new Error('Error fetching code blocks');
    }
});
exports.getAllCodeBlocks = getAllCodeBlocks;
const getCodeBlockByTitle = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeBlock = yield CodeBlockModel_1.CodeBlockModel.findOne({ title });
        return codeBlock;
    }
    catch (error) {
        throw new Error('Error fetching code block');
    }
});
exports.getCodeBlockByTitle = getCodeBlockByTitle;
const updateCodeBlock = (title, newCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeBlock = yield CodeBlockModel_1.CodeBlockModel.findOneAndUpdate({ title }, { code: newCode }, { new: true });
        return codeBlock;
    }
    catch (error) {
        throw new Error('Error updating code block');
    }
});
exports.updateCodeBlock = updateCodeBlock;
//# sourceMappingURL=codeBlockService.js.map