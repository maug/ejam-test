import mongoose from 'mongoose';

import { Deployment, getDeployments, addDeployment, deleteDeployment } from './deployment';
import { Template, getTemplates } from './template';

const connectDb = () => {
  const mongoUri = 'mongodb+srv://ejam:sonar-malapert-purr@ejam.kmysw.mongodb.net/ejam?retryWrites=true&w=majority';
  return mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).catch(err => {
    console.error('MongoDB Connection error', err);
    process.exit(1);
  });

};

export default { connectDb, Deployment, getDeployments, addDeployment, deleteDeployment, Template, getTemplates };
