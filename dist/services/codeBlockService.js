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
exports.updateCodeBlock = exports.getCodeBlockByTitle = void 0;
const CodeBlock_1 = __importDefault(require("../models/CodeBlock"));
const getCodeBlockByTitle = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeBlock = yield CodeBlock_1.default.findOne({ title });
        return codeBlock;
    }
    catch (error) {
        throw new Error('Error fetching code block');
    }
});
exports.getCodeBlockByTitle = getCodeBlockByTitle;
const updateCodeBlock = (title, newCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeBlock = yield CodeBlock_1.default.findOneAndUpdate({ title }, { code: newCode }, { new: true });
        return codeBlock;
    }
    catch (error) {
        throw new Error('Error updating code block');
    }
});
exports.updateCodeBlock = updateCodeBlock;
