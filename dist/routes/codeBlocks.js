"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const codeBlockController_1 = require("../controllers/codeBlockController");
const router = express_1.default.Router();
router.get('/:title', codeBlockController_1.getCodeBlockByTitle);
router.put('/:title', codeBlockController_1.updateCodeBlock);
exports.default = router;
