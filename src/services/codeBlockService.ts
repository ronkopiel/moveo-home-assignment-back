import  { CodeBlockModel, ICodeBlock } from '../models/CodeBlockModel';


export const getAllCodeBlocks = async (): Promise<ICodeBlock[] | null> => {
    try {
      const codeBlocks = await CodeBlockModel.find();
      return codeBlocks;
    } catch (error) {
      throw new Error('Error fetching code blocks');
    }
  };

export const getCodeBlockByTitle = async (title: string): Promise<ICodeBlock | null> => {
  try {
    const codeBlock = await CodeBlockModel.findOne({ title });
    return codeBlock;
  } catch (error) {
    throw new Error('Error fetching code block');
  }
};

export const updateCodeBlock = async (title: string, newCode: string): Promise<ICodeBlock | null> => {
  try {
    const codeBlock = await CodeBlockModel.findOneAndUpdate({ title }, { code: newCode }, { new: true });
    return codeBlock;
  } catch (error) {
    throw new Error('Error updating code block');
  }
};
