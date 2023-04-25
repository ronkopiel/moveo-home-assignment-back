import { Request, Response } from 'express';
import  { getAllCodeBlocks, getCodeBlockByTitle } from '../services/codeBlockService';

// Function to handle the request for getting all code blocks
export const getCodeBlocks = async (req: Request, res: Response) => {
    try {
      // Fetch all code blocks
      const codeBlocks = await getAllCodeBlocks();
      
      // Check if any code blocks were found
      if (codeBlocks) {
        console.log('codeBlocks', codeBlocks)
        res.json(codeBlocks);
      } else {
        res.status(404).json({ message: 'Code block not found' });
      }
    } catch (error) {
      // Handle errors and send a 500 response with error details
      res.status(500).json({ message: 'Error fetching code block', error });
    }
  };

// Function to handle the request for getting a specific code block by title
export const getCodeBlock = async (req: Request, res: Response) => {
  // Get title from request params
  const title = req.params.title;
  
  try {
    // Fetch code block by title
    const codeBlock = await getCodeBlockByTitle(title);

    // Check if the code block was found
    if (codeBlock) {
      res.json(codeBlock);
    } else {
      res.status(404).json({ message: 'Code block not found' });
    }
  } catch (error) {
    // Handle errors and send a 500 response with error details
    res.status(500).json({ message: 'Error fetching code block', error });
  }
};
