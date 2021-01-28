import Response from 'utils/response';
import {condition} from 'utils/mappings';

export default class Controller {
  static async get(_, res, next) {
    try {
      const data = {
        name: 'Victor Aiyeola',
        github: '@aiyeola',
        email: 'aiyeolavictor@gmail.com',
        mobile: '08182891282',
        twitter: '@victor_aiyeola',
      };

      return Response.Success(res, 'My Rule-Validation API', data);
    } catch (error) {
      return next(error);
    }
  }

  static async post(req, res, next) {
    const {
      body: {rule, data},
    } = req;

    try {
      if (Object.keys(req.body).length === 0) {
        return Response.Error(res, 'Invalid JSON payload passed.');
      }

      if (typeof data === 'object' && Object.keys(data).includes(rule.field)) {
        if (typeof data[rule.field] !== 'number') {
          Response.Error(res, `${rule.field} must be a number`);
        }

        const validation = eval(
          `${data[rule.field]} ${condition[rule.condition]} ${rule.condition_value}`
        );

        let responseData = {
          validation: {
            error: false,
            field: `${rule.field}`,
            field_value: `${data[rule.field]}`,
            condition: `${rule.condition}`,
            condition_value: `${rule.condition_value}`,
          },
        };

        if (validation) {
          const message = `field ${rule.field} successfully validated.`;
          return Response.Success(res, message, responseData);
        } else {
          const message = `field ${rule.field} failed validation.`;
          responseData = {
            ...responseData,
            ...(responseData.validation.error = true),
          };
          return Response.Error(res, message, responseData);
        }
      } else {
        return Response.Error(res, `There must be a ${rule.field} property in data.`);
      }
    } catch (error) {
      return next(error);
    }
  }
}
