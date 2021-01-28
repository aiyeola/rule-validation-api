[![Build Status](https://travis-ci.com/aiyeola/rule-validation-api.svg?branch=main)](https://travis-ci.com/aiyeola/rule-validation-api)
[![Coverage Status](https://coveralls.io/repos/github/aiyeola/rule-validation-api/badge.svg?branch=main)](https://coveralls.io/github/aiyeola/rule-validation-api?branch=main)
# Rule Validation API

This is my solution to the NodeJS Backend Engineer (Intern) assessment test

## How to Install and run the application

- Clone the application and run `yarn install`
- Run `yarn run start:dev` to start development server
- Run `yarn run test` to run tests and generate coverage report

**Test Coverage report can be found at `coverage/index.html`**

## Test JSON payload

```json
{
  "rule": {
    "field": "missions",
    "condition": "neq",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": 30
  }
}
```

Additional features
- Internal logging system
- Code Test

## Deployed at <https://victor-rule-validation-api.herokuapp.com/>
