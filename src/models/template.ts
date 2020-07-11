import mongoose, { Document, Model, Schema } from 'mongoose';

const templateSchema = new Schema({
    name: String,
    versions: [String],
});

interface TemplateDoc extends Document {
    name: string,
    versions: string[],
}

const Template: Model<TemplateDoc> = mongoose.model<TemplateDoc>('Template', templateSchema, 'templates');

function getTemplates(): Promise<TemplateDoc[]> {
    return Template.find().exec();
}

export { Template, getTemplates };
