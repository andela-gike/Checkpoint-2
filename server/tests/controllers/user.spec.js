import chai from 'chai';
import supertest from 'supertest';
import app from '../../routes/index';
import helpers from '../helpers/helpers';


const request = supertest.agent(app);
const should = chai.should();
const users = helpers.legitUsers;
const invalidUser = helpers.invalidUsers;


describe('User Routes Spec', () => {
  let adminUserToken;
  let regularUserToken;
  before((done) => {
    request.post('users/login')
      .send({
        email: users[0].email,
        password: users[0].password
      })
      .end((error, response) => {
        adminUserToken = response.body.token;
      });
    request.post('users/login')
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
      request.post('/users')
        .send({
          firstName: 'Blessing',
          lastName: 'Herbert',
          email: 'herbbliss@example.com',
          userName: 'blissbert',
          password: 'passion123'
        })
        .end((err, response) => {
          response.status.should.equal(201);
          response.body.message.should.equal('User was successfully created');
          response.body.data.userName.should.equal('blissbert');
          should.exist(response.body.token);
          done();
        });
    });
    it('should not register user if some fields are left empty', (done) => {
      request.post('/users')
        .send(invalidUser[1])
        .end((err, response) => {
          response.status.should.equal(400);
          response.body.message.should.equal('Fill the required fields');
          done();
        });
    });
    it('should not register user with an already existing email', (done) => {
      request.post('/users')
        .send(users[2])
        .end((err, response) => {
          response.status.should.equal(409);
          response.body.message.should.equal('Email already exists');
          done();
        });
    });
    it('should generate and return a token when user signin', (done) => {
      request.post('users/login')
        .send({
          email: users[2].email,
          password: users[2].password
        })
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.message.should.equal('You are successfully logged in');
          should.exist(response.body.token);
          done();
        });
    });
    it('should not sign in a user if required fields are missing', (done) => {
      request.post('/users/login')
        .send({
          email: users[2].email
        })
        .end((err, response) => {
          response.status.should.equal(401);
          response.body.message.should.equal('Invalid login credentials');
          done();
        });
    });
    it('should not sign in a non-registered user', (done) => {
      request.post('/users/login')
        .send({
          email: 'notthere@example.com',
          password: 'hastalavista'
        })
        .end((err, response) => {
          response.status.should.equal(403);
          response.body.message.should.equal('No user was found');
          done();
        });
    });
    it('should not sign in a user if password is invalid', (done) => {
      request.post('/users/login')
        .send({
          email: users[2].email,
          password: 'ninitena'
        })
        .end((err, response) => {
          response.status.should.equal(401);
          response.body.message.should.equal('Invalid password');
          done();
        });
    });
  });

  describe('Get Users', () => {
    it('should get a list of all users', (done) => {
      request.get('/users')
        .set('authorization', regularUserToken)
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.message.should.equal('Listing available users');
          done();
        });
    });
    it('should require a token before listing available users', (done) => {
      request.get('/users')
        .end((err, response) => {
          response.status.should.equal(401);
          response.body.message.should.equal('Verification failed');
          done();
        });
    });
    it(`should not allow access to the list of
    users if the token is invalid`, (done) => {
      request.get('/users')
        .set('authorization', 'hdfhf743u43brf97dhewhurvgy382hch')
        .end((err, response) => {
          response.status.should.equal(401);
          response.body.message.should.equal('Invalid token');
          done();
        });
    });
    it('should search for a user by id', (done) => {
      request.get('/users/4')
        .set('authorization', regularUserToken)
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.message.should.equal('User found!');
          should.exist(response.body.data);
          done();
        });
    });
    it('should return an error message if the user was not found', (done) => {
      request.get('/users/4098')
        .set('authorization', regularUserToken)
        .end((err, response) => {
          response.status.should.equal(404);
          response.body.message.should.equal('The user was not found');
          done();
        });
    });
  });

  describe('User Search', () => {
  });

  describe('User Documents', () => {
  });

  describe('User Updating', () => {
    it('should allow a user to update their data', (done) => {
      request.put('/users/2')
        .set('authorization', regularUserToken)
        .send({
          email: 'jk@example.com'
        })
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.message.should.equal('User updated successfully');
          should.exist(response.body.data);
          done();
        });
    });
  });

  describe('User Deletion', () => {
    it('should allow an admin to delete a user\'s account', (done) => {
      request.delete('/users/5')
        .set('authorization', adminUserToken)
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.message.should.equal('User was deleted successfully');
          done();
        });
    });
  });

  describe('User Logout', () => {
    it('should log a user out', (done) => {
      request.post('/users/logout')
        .set('authorization', regularUserToken)
        .end((err, response) => {
          response.status.should.have(200);
          response.body.message.should.equal('You were logged out successfully');
          done();
        });
    });
    it('should require a user to have a valid token to be logged out', (done) => {
      request.post('/users/logout')
        .end((err, response) => {
          response.status.should.equal(401);
          response.body.message.should.equal('Verification failed');
          done();
        });
    });
  });
});
