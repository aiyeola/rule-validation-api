import Joi from 'joi';

import validator from 'utils/validator';

export default class Validator {
  static async validateRule(req, res, next) {
    const schema = Joi.object({
      rule: Joi.object().keys({
        field: Joi.string().required(),
        condition: Joi.string().valid('eq', 'neq', 'gt', 'gte').required(),
        condition_value: Joi.number().integer().required(),
      }),
      data: Joi.any(),
    })
      .with('rule', 'data')
      .and('rule', 'data');

    validator(schema, req.body, res, next);
  }
}
