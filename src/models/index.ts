import mongoose from 'mongoose';

import Deployment from './deployment';
import Template from './template';

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

const models = { Deployment, Template };

export { connectDb };

export default models;
