import mongoose, { Document, Model, Schema } from 'mongoose';

const deploymentSchema = new Schema({
    url: String,
    templateName: String,
    version: String,
    deployedAt: Date,
});

interface DeploymentProps extends Document {
    url: string,
    templateName: string,
    version: string,
    deployedAt: Date,
}

const Deployment: Model<DeploymentProps> = mongoose.model('Deployment', deploymentSchema, 'deployments');

export { Deployment };
