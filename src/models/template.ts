import mongoose, { Document, Model, Schema } from 'mongoose';

const templateSchema = new Schema({
    name: String,
    versions: [String],
});

interface TemplateProps extends Document {
    name: string,
    versions: string[],
}

const Template: Model<TemplateProps> = mongoose.model<TemplateProps>('Template', templateSchema, 'templates');

function getTemplates(): Promise<TemplateProps[]> {
    return Template.find().exec();
}

export { Template, getTemplates };
