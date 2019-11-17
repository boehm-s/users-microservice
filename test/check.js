const request = require('supertest');
const should  = require('should');
const app     = require('../src/app');


describe('Check', () => {
    it('Check if API is running', done => {
        request(app)
            .get('/health-check')
            .expect(200).expect(res => {
                res.body.success.should.equal(true);
            }).end(done);
    });
});
