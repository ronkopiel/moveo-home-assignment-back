"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const codeBlockController_1 = require("../controllers/codeBlockController");
const router = express_1.default.Router();
router.get('/', codeBlockController_1.getCodeBlocks);
router.get('/:title', codeBlockController_1.getCodeBlock);
router.put('/:title', codeBlockController_1.updateCode);
exports.default = router;
//# sourceMappingURL=codeBlocksRouter.js.map