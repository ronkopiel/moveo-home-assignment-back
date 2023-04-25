import express from 'express';
import { getCodeBlock, getCodeBlocks, updateCode } from '../controllers/codeBlockController';

const router = express.Router();
router.get('/', getCodeBlocks);
router.get('/:title', getCodeBlock);
router.put('/:title', updateCode);

export default router;
