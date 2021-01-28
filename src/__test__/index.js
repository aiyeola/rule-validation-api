import chai from 'chai';
import chaiHttp from 'chai-http';
import index from 'index';

const server = index.app;

const {expect} = chai;

chai.use(chaiHttp);

const correctData = {
  rule: {
    field: 'missions',
    condition: 'gte',
    condition_value: 30,
  },
  data: {
    name: 'James Holden',
    crew: 'Rocinante',
    age: 34,
    position: 'Captain',
    missions: 45,
  },
};

const invalidData = {
  rule: {
    field: 'missions',
    condition: 'neq',
    condition_value: 30,
  },
  data: {
    missions: 30,
  },
};

const invalidJSON = {};

const dataMissing = {
  rule: {
    field: 'missions',
    condition: 'gte',
    condition_value: 30,
  },
};

const ruleMissing = {
  data: {
    name: 'James Holden',
    crew: 'Rocinante',
    age: 34,
    position: 'Captain',
  },
};

const ruleField = {
  rule: {
    condition: 'gte',
    condition_value: 30,
  },
  data: {
    name: 'James Holden',
    crew: 'Rocinante',
    age: 34,
    position: 'Captain',
    missions: 45,
  },
};

const ruleFieldNumber = {
  rule: {
    field: 11,
    condition: 'gte',
    condition_value: 30,
  },
  data: {
    name: 'James Holden',
    crew: 'Rocinante',
    age: 34,
    position: 'Captain',
    missions: 45,
  },
};

const ruleCondition = {
  rule: {
    field: 'missions',
    condition_value: 30,
  },
  data: {
    name: 'James Holden',
    crew: 'Rocinante',
    age: 34,
    position: 'Captain',
    missions: 45,
  },
};

const ruleConditionMatch = {
  rule: {
    field: 'missions',
    condition: 'qq',
    condition_value: 30,
  },
  data: {
    name: 'James Holden',
    crew: 'Rocinante',
    age: 34,
    position: 'Captain',
    missions: 45,
  },
};

const ruleConditionValue = {
  rule: {
    field: 'missions',
    condition: 'gte',
  },
  data: {
    name: 'James Holden',
    crew: 'Rocinante',
    age: 34,
    position: 'Captain',
    missions: 45,
  },
};

const ruleConditionValueMatch = {
  rule: {
    field: 'missions',
    condition: 'gte',
    condition_value: 'test',
  },
  data: {
    name: 'James Holden',
    crew: 'Rocinante',
    age: 34,
    position: 'Captain',
    missions: 45,
  },
};

const dataRuleField = {
  rule: {
    field: 'missions',
    condition: 'neq',
    condition_value: 30,
  },
  data: 12,
};

const dataRuleFieldEmpty = {
  rule: {
    field: 'missions',
    condition: 'neq',
    condition_value: 30,
  },
  data: {},
};

const dataFieldInvalid = {
  rule: {
    field: 'missions',
    condition: 'neq',
    condition_value: 30,
  },
  data: {
    name: 'dada',
    missions: {},
  },
};

describe('Test all routes', () => {
  it('should hit base route', async () => {
    const res = await chai.request(server).get('/');
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('My Rule-Validation API');
  });

  it('should return 400 error if sent an invalid JSON object', async () => {
    const res = await chai.request(server).post('/validate-rule').send(invalidJSON);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('Invalid JSON payload passed.');
  });

  it("should return 400 error if a required field isn't passed", async () => {
    const res = await chai.request(server).post('/validate-rule').send(dataMissing);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"rule" missing required peer "data".');
  });

  it("should return 400 error if a required field isn't passed", async () => {
    const res = await chai.request(server).post('/validate-rule').send(ruleMissing);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"value" contains [data] without its required peers [rule].');
  });

  it("should return 400 error if the rule object doesn't have a field property ", async () => {
    const res = await chai.request(server).post('/validate-rule').send(ruleField);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"rule.field" is required.');
  });

  it('should return 400 error if the rule.field property is a number ', async () => {
    const res = await chai.request(server).post('/validate-rule').send(ruleFieldNumber);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"rule.field" must be a string.');
  });

  it("should return 400 error if a rule object doesn't have a condition property ", async () => {
    const res = await chai.request(server).post('/validate-rule').send(ruleCondition);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"rule.condition" is required.');
  });

  it("should return 400 error if a rule object doesn't have a condition property that matches", async () => {
    const res = await chai.request(server).post('/validate-rule').send(ruleConditionMatch);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"rule.condition" must be one of [eq, neq, gt, gte].');
  });

  it("should return 400 error if a rule object doesn't have a condition_value property", async () => {
    const res = await chai.request(server).post('/validate-rule').send(ruleConditionValue);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"rule.condition_value" is required.');
  });

  it("should return 400 error if a rule object doesn't have a condition_value property that matches", async () => {
    const res = await chai.request(server).post('/validate-rule').send(ruleConditionValueMatch);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"rule.condition_value" must be a number.');
  });

  it('should return 400 error if a data key is not an object', async () => {
    const res = await chai.request(server).post('/validate-rule').send(dataRuleField);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('There must be a missions property in data.');
  });

  it('should return 400 error if a data key is an empty object', async () => {
    const res = await chai.request(server).post('/validate-rule').send(dataRuleFieldEmpty);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('There must be a missions property in data.');
  });

  it('should return 400 error if a data.field property is not a number', async () => {
    const res = await chai.request(server).post('/validate-rule').send(dataFieldInvalid);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('missions must be a number');
  });

  it('should return 200 if validation passes', async () => {
    const res = await chai.request(server).post('/validate-rule').send(correctData);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('field missions successfully validated.');
  });

  it('should return 400 if validation fails', async () => {
    const res = await chai.request(server).post('/validate-rule').send(invalidData);
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('field missions failed validation.');
  });
});
