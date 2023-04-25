import express from 'express';
import { getCodeBlock, getCodeBlocks,  } from '../controllers/codeBlockController';

const router = express.Router();
router.get('/', getCodeBlocks);
router.get('/:title', getCodeBlock);


export default router;
