import express from 'express';

import Controllers from 'controllers';
import Validate from 'validation/index';
import method from 'utils/method';

const router = express();

router.route('/').get(Controllers.get).all(method);

router.route('/validate-rule').post(Controllers.post).all(method);

export default router;
