import { Request, Response } from 'express';
import  { getAllCodeBlocks, getCodeBlockByTitle, updateCodeBlock } from '../services/codeBlockService';
 '../services/codeBlockService';

export const getCodeBlocks = async (req: Request, res: Response) => {
    try {
       
      const codeBlocks = await getAllCodeBlocks();
        
      if (codeBlocks) {
        console.log('codeBlocks', codeBlocks)
        res.json(codeBlocks);
      } else {
        res.status(404).json({ message: 'Code block not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching code block', error });
    }
  };

export const getCodeBlock = async (req: Request, res: Response) => {
  const title = req.params.title;
  try {
    const codeBlock = await getCodeBlockByTitle(title);

    if (codeBlock) {
      res.json(codeBlock);
    } else {
      res.status(404).json({ message: 'Code block not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching code block', error });
  }
};

export const updateCode = async (req: Request, res: Response) => {
  const title = req.params.title;
  const newCode = req.body.code;

  try {
    const updatedCodeBlock = await updateCodeBlock(title, newCode);

    if (updatedCodeBlock) {
      res.status(200).json({ message: 'Code block updated' });
    } else {
      res.status(404).json({ message: 'Code block not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating code block', error });
  }
};
