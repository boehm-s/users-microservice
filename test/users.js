const request = require('supertest');
const session = require('supertest-session');
const should = require('should');
const app = require('../app');

let testSession, userSession, adminSession;

beforeEach(() => testSession = session(app));

const userJSON = {
    name: 'test user',
    email: 'test@mail.net',
    password: 'password',
    role: 'user'
};

const adminJSON = {
    name: 'Steven BOEHM',
    email: 'boehm_s@seed-up.io',
    password: 'capsule',
    role: 'manager'
};


const newPassword = 'newPassword';

var USER_ID, ADMIN_TOKEN, USER_TOKEN;

describe('Users', () => {
    it('login as admin (original manager that is in the DB)', done => {
        testSession
	    .post('/api/users/login')
	    .type('form')
	    .send({'email': adminJSON.email})
	    .send({'password': adminJSON.password})
	    .expect(200).expect(res => {
		res.body.should.have.property('connected');
                res.body.connected.should.be.true();
		adminSession = testSession;
	    }).end(done);
    });

    it('login with wrong credentials', done => {
	request(app)
	    .post('/api/users/login')
	    .type('form')
	    .send({'email': adminJSON.email})
	    .send({'password': 'toto'})
	    .expect(401).end(done);
    });

    it('create an user as admin ', done => {
	adminSession
	    .post('/api/users')
	    .type('form')
	    .send({'email': userJSON.email})
	    .send({'password': userJSON.password})
	    .send({'role': userJSON.role})
	    .send({'name': userJSON.name})
	    .expect(200).expect(res => {
		res.body.should.have.properties(['id', 'email', 'role', 'name', 'manager', 'customer_id']);
		res.body.should.not.have.property('password');
		res.body.email.should.be.equal(userJSON.email);
		res.body.role.should.be.equal('user');
                res.body.name.should.be.equal(userJSON.name);
                res.body.customer_id.length.should.be.equal(10);
		USER_ID = res.body.id;
	    }).end(done);
    });

    it('login the newly created user', done => {
	testSession
	    .post('/api/users/login')
	    .type('form')
	    .send({'email': userJSON.email})
	    .send({'password': userJSON.password})
	    .expect(200).expect(res => {
		res.body.should.have.property('connected');
		res.body.connected.should.be.true();
		userSession = testSession;
	    }).end(done);
    });


    it('trying to create an user with bad or missing parameters', done => {
	adminSession
	    .post('/api/users')
	    .type('form')
	    .send({'email': userJSON.email})
	    .expect(400).end(done);
    });


    it('trying to access protected endpoint without token', done => {
	request(app)
	    .get('/api/users')
	    .expect(401).end(done);
    });

    it('trying to access manager-only endpoint with user token', done => {
	userSession
	    .post('/api/users')
	    .expect(403).end(done);
    });

    it('get the created user', done => {
	userSession
	    .get(`/api/users/${USER_ID}`)
	    .expect(200).expect(res => {
		res.body.should.have.properties(['id', 'email', 'role', 'name', 'manager', 'customer_id']);
		res.body.should.not.have.property('password');
		res.body.email.should.be.equal(userJSON.email);
		res.body.name.should.be.equal(userJSON.name);
		res.body.customer_id.length.should.be.equal(10);
		res.body.role.should.be.equal('user');
	    }).end(done);
    });

    it('get all users', done => {
	userSession
	    .get(`/api/users`)
	    .expect(200).expect(res => {
                res.body.should.be.an.Array();
                res.body.forEach(user => {
		    user.should.have.properties(['id', 'email', 'role', 'name', 'manager', 'customer_id']);
		    user.should.not.have.property('password');
                });
	    }).end(done);
    });

    it('update the user', done => {
	adminSession
	    .put(`/api/users/${USER_ID}`)
	    .type('form')
	    .send({'password': newPassword})
	    .expect(200).expect(res => {
		res.body.should.have.properties(['id', 'email', 'role', 'name', 'manager', 'customer_id']);
		res.body.should.not.have.property('password');
		res.body.email.should.be.equal(userJSON.email);
		res.body.role.should.be.equal('user');
	    }).end(done);
    });

    it('should login the user with the new password', done => {
	request(app)
	    .post('/api/users/login')
	    .type('form')
	    .send({'email': userJSON.email})
	    .send({'password': newPassword})
	    .expect(200).expect(res => {
		res.body.should.have.property('connected');
		res.body.connected.should.be.true();
		userSession = testSession;
	    }).end(done);
    });

    it('delete the user', done => {
        adminSession
	    .delete(`/api/users/${USER_ID}`)
	    .expect(200).expect(res => {
                res.body.should.have.property('deleted');
                res.body.deleted.should.be.true();
	    }).end(done);
    });
});
