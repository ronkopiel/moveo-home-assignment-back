import  { CodeBlockModel, ICodeBlock } from '../models/CodeBlockModel';

// Function to fetch all code blocks from the database
export const getAllCodeBlocks = async (): Promise<ICodeBlock[] | null> => {
    try {
      const codeBlocks = await CodeBlockModel.find();
      return codeBlocks;
    } catch (error) {
      throw new Error('Error fetching code blocks');
    }
  };

// Function to fetch a single code block by title from the database
export const getCodeBlockByTitle = async (title: string): Promise<ICodeBlock | null> => {
  try {
    const codeBlock = await CodeBlockModel.findOne({ title });
    return codeBlock;
  } catch (error) {
    throw new Error('Error fetching code block');
  }
};
