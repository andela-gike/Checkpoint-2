import chai from 'chai';
import supertest from 'supertest';
import app from '../../routes/index';
import helpers from '../helpers/helpers';


const request = supertest.agent(app);
const should = chai.should();
const expect = chai.expect;

const users = helpers.legitUsers;
const invalidUser = helpers.invalidUsers;


describe('User Routes Spec', () => {
  let adminUserToken;
  let regularUserToken;
  before((done) => {
    request.post('/api/users/login')
      .send({
        email: users[0].email,
        password: users[0].password
      })
      .end((error, response) => {
        adminUserToken = response.body.token;
      });
    request.post('/api/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .end((err, response) => {
        regularUserToken = response.body.token;
        done();
      });
  });

  describe('Authenticate users', () => {
    it('should successfully signup a user and generate a token', (done) => {
      request.post('/api/users')
        .send({
          firstName: 'Blessing',
          lastName: 'Herbert',
          email: 'herbbliss@example.com',
          userName: 'blissbert',
          password: 'passion123'
        })
        .expect(201)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should.equal('User was successfully created');
          response.body.data.userName.should.equal('blissbert');
          should.exist(response.body.token);
          done();
        });
    });
    it('should not register user if some fields are left empty', (done) => {
      request.post('/api/users')
        .send(invalidUser[1])
        .expect(400)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should.equal('The paramaters are incomplete');
          done();
        });
    });
    it('should not register user with an already existing email', (done) => {
      request.post('/api/users')
        .send(users[2])
        .expect(409)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should.equal(`There is a user already existing
            with this email or userName`);
          done();
        });
    });
    it('should generate and return a token when user signin', (done) => {
      request.post('/api/users/login')
        .send({
          email: users[2].email,
          password: users[2].password
        })
        .expect(200)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should.equal('You are successfully logged in');
          should.exist(response.body.token);
          done();
        });
    });
    it('should not sign in a user if required fields are missing', (done) => {
      request.post('/api/users/login')
        .send({
          email: users[2].email
        })
        .expect(401)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should
            .equal('There was a problem while logging in due to invalid credentials');
          done();
        });
    });
    it('should not sign in a non-registered user', (done) => {
      request.post('/api/users/login')
        .send({
          email: 'notargistereduser@example.com',
          password: '45thersa0'
        })
        .expect(403)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should.equal('User was not found');
          done();
        });
    });
    it('should not sign in a user if password is invalid', (done) => {
      request.post('/api/users/login')
        .send({
          email: users[2].email,
          password: 'invalidpassword'
        })
        .expect(401)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should.equal('Invalid password');
          done();
        });
    });
  });

  describe('Get Users', () => {
    it('should get a list of all users', (done) => {
      request.get('/api/users')
        .set('authorization', regularUserToken)
        .expect(200)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should.equal('Listing available users');
          done();
        });
    });
    it('should require a token before listing available users', (done) => {
      request.get('/api/users')
      .expect(401)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should.equal('Verification failed');
          done();
        });
    });
    it(`should not allow access to the list of
    users if the token is invalid`, (done) => {
      request.get('/api/users')
        .set('authorization', 'hdfhf743u43brf97dhewhurvgy382hch')
        .expect(401)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should.equal('Invalid token');
          done();
        });
    });
    it('should search for a user by id', (done) => {
      request.get('/api/users/4')
        .set('authorization', regularUserToken)
        .expect(200)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should.equal('User found!');
          should.exist(response.body.data);
          done();
        });
    });
    it('should return an error message if the user was not found', (done) => {
      request.get('/api/users/4098')
        .set('authorization', regularUserToken)
        .expect(404)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should
            .equal('User was not found');
          done();
        });
    });
  });

  describe('User Search', () => {
  });

  describe('User Documents', () => {
  });

  describe('Updating user', () => {
    it('should allow a user to update their data', (done) => {
      request.put('/api/users/2')
        .set('authorization', regularUserToken)
        .send({
          email: 'ikgrace@example.com'
        })
        .expect(200)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should
            .equal('User information updated successfully');
          should.exist(response.body.data);
          done();
        });
    });
  });

  describe('User Deletion', () => {
    it('should allow an admin to delete a user\'s account', (done) => {
      request.delete('/api/users/5')
        .set('authorization', adminUserToken)
        .expect(200)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should.equal('User was deleted successfully');
          done();
        });
    });
  });

  describe('User Logout', () => {
    it('should log a user out', (done) => {
      request.post('/api/users/logout')
        .set('authorization', regularUserToken)
        .expect(200)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should.equal('You were logged out successfully');
          done();
        });
    });
    it('should require a user to have a valid token to be logged out', (done) => {
      request.post('/api/users/logout')
      .expect(401)
        .end((err, response) => {
          expect(typeof response.body).to.equal('object');
          response.body.message.should.equal('Verification failed');
          done();
        });
    });
  });
});
