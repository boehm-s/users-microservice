const request = require('supertest');
const should  = require('should');
const chai    = require('chai');
const app     = require('../src/app');
const expect  = chai.expect;

describe('Setup', _ => {
    it('should check if the API is running', done => {
	request(app).get('/health-check').end((err, res) => {
	    expect(res.statusCode).to.equal(200);
	    expect(res.body.success).to.equal(true);
	    done();
	});
    });
});
