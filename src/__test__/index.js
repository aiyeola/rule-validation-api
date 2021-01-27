import chai from 'chai';
import chaiHttp from 'chai-http';
import index from 'src/index';

const server = index.app;

const {expect} = chai;
