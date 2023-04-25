import mongoose, { Schema } from 'mongoose';


export interface ICodeBlock{
  title: string;
  code: string;
  solution: string
}

const CodeBlockSchema = new Schema<ICodeBlock>({
  title: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  solution: {type: String, required: true}
});

export const CodeBlockModel = mongoose.model<ICodeBlock>('codeblocks', CodeBlockSchema);
