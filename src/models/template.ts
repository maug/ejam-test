import mongoose, { Document, Model, Schema } from 'mongoose';

const templateSchema = new Schema({
    name: String,
    versions: [String],
});

interface TemplateProps extends Document {
    name: string,
    versions: string[],
}

const Template: Model<TemplateProps> = mongoose.model('Template', templateSchema, 'templates');

export default Template;
