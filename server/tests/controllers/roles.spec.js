import chai from 'chai';
import supertest from 'supertest';
import app from '../../routes/index';
import helpers from '../helpers/helpers';

const request = supertest.agent(app);
const should = chai.should();
const users = helpers.legitUsers;


describe('Role API Spec', () => {
  let adminUserToken;
  let regularUserToken;
  before((done) => {
    request.post('/users/login')
      .send({
        email: users[0].email,
        password: users[0].password
      })
      .end((error, response) => {
        adminUserToken = response.body.token;
      });
    request.post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .end((error, response) => {
        regularUserToken = response.body.token;
        done();
      });
  });

  describe('Role Creation', () => {
    it('should allow an admin to create roles', (done) => {
      request.post('/roles')
        .set('authorization', adminUserToken)
        .send({
          title: 'sensei'
        })
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.message
            .should.equal('The role was successfully created');
          response.body.role.title.should.equal('sensei');
          done();
        });
    });
    it('should not allow a regular user to create roles', (done) => {
      request
        .post('/roles')
        .set('authorization', regularUserToken)
        .send({
          title: 'nothappening'
        })
        .end((err, response) => {
          response.status.should.equal(403);
          response.body.message.should.equal('Permission denied, admin only');
          done();
        });
    });
    it('should not create a role is title wasn\'t given', (done) => {
      request
        .post('/roles')
        .set('authorization', adminUserToken)
        .send({
          title: ''
        })
        .end((err, response) => {
          response.status.should.equal(400);
          response.body.message.should.equal('Title cannot be blank');
          done();
        });
    });
    it('should not create duplicate role titles', (done) => {
      request
        .post('/roles')
        .set('authorization', adminUserToken)
        .send({
          title: 'user'
        })
        .end((err, response) => {
          response.status.should.equal(409);
          response.body.message.should.equal('Role already exists');
          done();
        });
    });
  });

  describe('Get Roles', () => {
    it('should allow an admin to view all roles', (done) => {
      request
        .get('/roles')
        .set('authorization', adminUserToken)
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.message.should
          .equal('This is a list of the available roles');
          should.exist(response.body.data);
          done();
        });
    });
    it('should not let a regular user view roles', (done) => {
      request
        .get('/roles')
        .set('authorization', regularUserToken)
        .end((err, response) => {
          response.status.should.equal(403);
          response.body.message.should.equal('Permission denied, admin only');
          done();
        });
    });
    it('should allow an admin to view a specific role', (done) => {
      request
        .get('/roles/3')
        .set('authorization', adminUserToken)
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.message.should
          .equal('The Role you want has been found');
          should.exist(response.body.data);
          done();
        });
    });
    it('should not let a regular user view a specific role', (done) => {
      request
        .get('/roles/3')
        .set('authorization', regularUserToken)
        .end((err, response) => {
          response.status.should.equal(403);
          response.body.message.should.equal('Permission denied, admin only');
          done();
        });
    });
    it('should return a message if role was not found', (done) => {
      request
      .get('/roles/345673')
      .set('authorization', adminUserToken)
      .end((err, response) => {
        response.status.should.equal(404);
        response.body.message.should
        .equal('Role with the id: 345673 does not exist');
        done();
      });
    });
  });

  describe('Update Roles', () => {
    it('should allow the admin to update a role', (done) => {
      request
      .put('/roles/3')
        .set('authorization', adminUserToken)
        .send({
          title: 'shifu'
        })
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.message.should.equal('Role was successfully updated');
          done();
        });
    });
    it('should not allow a regular user to update a role', (done) => {
      request
      .put('/roles/3')
        .set('authorization', regularUserToken)
        .send({
          title: 'woi'
        })
        .end((err, response) => {
          response.status.should.equal(403);
          response.body.message.should.equal('Permission denied, admin only');
          done();
        });
    });
    it('should not update a role that does not exist', (done) => {
      request
      .put('/roles/33345256')
        .set('authorization', adminUserToken)
        .send({
          title: 'notgonnahappen'
        })
        .end((err, response) => {
          response.status.should.equal(404);
          response.body.message.should
          .equal('Cannot update a role that does not exist');
          done();
        });
    });
    it('should not update a role if title is not given', (done) => {
      request
      .put('/roles/3')
        .set('authorization', adminUserToken)
        .send({
          title: ''
        })
        .end((err, response) => {
          response.status.should.equal(404);
          response.body.message.should
          .equal('You need to write the Title you want to update');
          done();
        });
    });
  });

  describe('Delete Role', () => {
    it('should allow an admin to delete roles', (done) => {
      request
      .delete('/roles/3')
        .set('authorization', adminUserToken)
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.message.should.equal('Role was successfully deleted');
          done();
        });
    });
    it('should prevent a regular user from deleting roles', (done) => {
      request
      .delete('/roles/2')
        .set('authorization', regularUserToken)
        .end((err, response) => {
          response.status.should.equal(403);
          response.body.message.should.equal('Permission denied, admin only');
          done();
        });
    });
    it('should not delete non-existent roles', (done) => {
      request
      .delete('/roles/2336')
        .set('authorization', adminUserToken)
        .end((err, response) => {
          response.status.should.equal(404);
          response.body.message.should
          .equal('Cannot delete a role that does not exist');
          done();
        });
    });
  });
});
