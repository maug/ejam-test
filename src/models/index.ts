import mongoose, { Mongoose } from 'mongoose';

import * as deployment from './deployment';
import * as template from './template';

function init(mongoUri: string): Promise<Mongoose> {
  return mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

export default { init, ...deployment, ...template };
