const request = require('supertest');
const should = require('should');
const app = require('../app');

describe('Test', () => {
    it('Get /api/health-check', done => {
	request(app)
	    .get('/api/health-check')
	    .expect(200).expect(res => {
		res.text.should.equal("OK");
	    }).end(done);
    });
});
