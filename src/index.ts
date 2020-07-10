import './LoadEnv'; // Must be the first import
import app, { setCriticalError } from '@server';
import logger from '@shared/Logger';
import models from "./models";

async function init() {
  try {
    if (!mongoUri) {
      setCriticalError('MONGO_URI env variable not set');
    } else {
      await models.init(mongoUri);
    }
  } catch (e) {
    setCriticalError(e.message);
  }
  app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
  });
}

// Start the server
const port = Number(process.env.PORT || 3000);
const mongoUri = process.env.MONGO_URI;

init();
