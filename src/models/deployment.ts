import mongoose, { Document, Model, Schema } from 'mongoose';
import models from "./index";

const deploymentSchema = new Schema({
    url: String,
    templateName: String,
    version: String,
    deployedAt: Date,
});

interface DeploymentDoc extends Document {
    url: string,
    templateName: string,
    version: string,
    deployedAt: Date,
}

const Deployment: Model<DeploymentDoc> = mongoose.model('Deployment', deploymentSchema, 'deployments');

function getDeployments(): Promise<DeploymentDoc[]> {
    return Deployment.find().sort({ deployedAt: -1 }).exec();
}

function addDeployment(props: { templateName: string, version: string, url: string }): Promise<DeploymentDoc> {
    let deployment = new models.Deployment({ ...props, deployedAt: new Date()});
    return deployment.save();
}

async function deleteDeployment(id: string): Promise<boolean> {
    const result = await models.Deployment.deleteOne({ _id: id });
    console.log('delete', result);
    return (result.deletedCount === 1);
}

export { Deployment, getDeployments, addDeployment, deleteDeployment };
