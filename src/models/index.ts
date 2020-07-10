import mongoose from 'mongoose';

import * as deployment from './deployment';
import * as template from './template';

const init = () => {
  const mongoUri = 'mongodb+srv://ejam:sonar-malapert-purr@ejam.kmysw.mongodb.net/ejam?retryWrites=true&w=majority';
  return mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }).catch(err => {
    console.error('MongoDB Connection error', err);
    process.exit(1);
  });

};

export default { init, ...deployment, ...template };
