import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorhandler from 'errorhandler';

import routes from 'routes';
import logger from 'utils/logger';

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());

app.use(helmet.dnsPrefetchControl({allow: false}));
app.use(helmet.frameguard({action: 'deny'}));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy({policy: 'same-origin'}));
app.use(helmet.xssFilter());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if (!isProduction) {
  app.use(errorhandler());
}

app.use('/', routes);

const PORT = process.env.PORT || 4000;

if (!isProduction) {
  app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stack traces leaked to user
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${server.address().port}`);
});

export default {app};

// const path = require("path");
// const jsConfig = require("./jsconfig.json");
// root: [path.resolve(jsConfig.compilerOptions.baseUrl)],
