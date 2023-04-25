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
exports.updateCode = exports.getCodeBlock = exports.getCodeBlocks = void 0;
const codeBlockService_1 = require("../services/codeBlockService");
'../services/codeBlockService';
const getCodeBlocks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeBlocks = yield (0, codeBlockService_1.getAllCodeBlocks)();
        if (codeBlocks) {
            console.log('codeBlocks', codeBlocks);
            res.json(codeBlocks);
        }
        else {
            res.status(404).json({ message: 'Code block not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching code block', error });
    }
});
exports.getCodeBlocks = getCodeBlocks;
const getCodeBlock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.params.title;
    try {
        const codeBlock = yield (0, codeBlockService_1.getCodeBlockByTitle)(title);
        if (codeBlock) {
            res.json(codeBlock);
        }
        else {
            res.status(404).json({ message: 'Code block not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching code block', error });
    }
});
exports.getCodeBlock = getCodeBlock;
const updateCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.params.title;
    const newCode = req.body.code;
    try {
        const updatedCodeBlock = yield (0, codeBlockService_1.updateCodeBlock)(title, newCode);
        if (updatedCodeBlock) {
            res.status(200).json({ message: 'Code block updated' });
        }
        else {
            res.status(404).json({ message: 'Code block not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating code block', error });
    }
});
exports.updateCode = updateCode;
//# sourceMappingURL=codeBlockController.js.map