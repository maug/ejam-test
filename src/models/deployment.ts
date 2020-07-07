import mongoose, { Document, Model, Schema } from 'mongoose';

const deploymentSchema = new Schema({
    url: String,
    templateName: String,
    version: String,
    deployedAt: Date,
});

interface DeploymentProps extends Document {
    name: string,
    versions: string[],
}

const Deployment: Model<DeploymentProps> = mongoose.model('Deployment', deploymentSchema, 'deployments');

export default Deployment;
