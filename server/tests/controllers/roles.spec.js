import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../routes/index';
import helpers from '../helpers/helpers';

const request = supertest.agent(app);
const users = helpers.legitUsers;


describe('Role API Spec', () => {
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
      .end((error, response) => {
        regularUserToken = response.body.token;
        done();
      });
  });

  describe('Create Roles', () => {
    it('should allow an admin to create roles without including a role id', (done) => {
      request.post('/api/roles')
        .set('authorization', adminUserToken)
        .send({
          title: 'lords'
        })
        .expect(200)
        .end((err, response) => {
          expect(response.body.title).to.equal('lords');
          done();
        });
    });
    it('should not allow a regular user to create roles', (done) => {
      request
        .post('/api/roles')
        .set('authorization', regularUserToken)
        .send({
          title: 'nothappening'
        })
        .expect(403)
        .end((err, response) => {
          expect(response.body.message).to.equal('Permission denied, admin only');
          done();
        });
    });
    it('should not create a role is title wasn\'t given', (done) => {
      request
        .post('/api/roles')
        .set('authorization', adminUserToken)
        .send({
          title: ''
        })
        .expect(400)
        .end((err, response) => {
          expect(response.body.message).to.equal('Title cannot be blank');
          done();
        });
    });
    it('should not create duplicate role titles', (done) => {
      request
        .post('/api/roles')
        .set('authorization', adminUserToken)
        .send({
          title: 'user'
        })
        .expect(409)
        .end((err, response) => {
          expect(response.body.message).to.equal('Role already exists');
          done();
        });
    });
  });

  describe('Get Roles', () => {
    it('should allow an admin to view all roles', (done) => {
      request
        .get('/api/roles')
        .set('authorization', adminUserToken)
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
    it('should not let a regular user view roles', (done) => {
      request
        .get('/api/roles')
        .set('authorization', regularUserToken)
        .expect(403)
        .end((err, response) => {
          expect(response.body.message).to.equal('Permission denied, admin only');
          done();
        });
    });
    it('should allow an admin to view a specific role', (done) => {
      request
        .get('/api/roles/3')
        .set('authorization', adminUserToken)
        .expect(200)
        .end((err, response) => {
          expect(response.body.message).to
          .equal('The Role you want has been found');
          expect(response.body.data).to.exist;
          done();
        });
    });
    it('should not let a regular user view a specific role', (done) => {
      request
        .get('/api/roles/3')
        .set('authorization', regularUserToken)
        .expect(403)
        .end((err, response) => {
          expect(response.body.message).to.equal('Permission denied, admin only');
          done();
        });
    });
    it('should return a message if role was not found', (done) => {
      request
      .get('/api/roles/345673')
        .set('authorization', adminUserToken)
      .expect(404)
      .end((err, response) => {
        expect(response.body.message).to
        .equal('Role with the id: 345673 does not exist');
        done();
      });
    });
  });

  describe('Update Roles', () => {
    it('should allow the admin to update a role', (done) => {
      request
      .put('/api/roles/3')
        .set('authorization', adminUserToken)
        .send({
          title: 'master'
        })
        .expect(200)
        .end((err, response) => {
          expect(response.body.message).to.equal('Role was successfully updated');
          done();
        });
    });
    it('should not allow a regular user to update a role', (done) => {
      request
      .put('/api/roles/3')
        .set('authorization', regularUserToken)
        .send({
          title: 'willos'
        })
        .expect(403)
        .end((err, response) => {
          expect(response.body.message).to.equal('Permission denied, admin only');
          done();
        });
    });
    it('should not update a role that does not exist', (done) => {
      request
      .put('/api/roles/33345256')
        .set('authorization', adminUserToken)
        .send({
          title: 'notgonnahappen'
        })
        .expect(404)
        .end((err, response) => {
          expect(response.body.message).to
          .equal('Cannot update a role that does not exist');
          done();
        });
    });
    it('should not update a role if title is not given', (done) => {
      request
      .put('/api/roles/3')
        .set('authorization', adminUserToken)
        .send({
          title: ''
        })
        .expect(404)
        .end((err, response) => {
          expect(response.body.message).to
          .equal('You need to write the Title you want to update');
          done();
        });
    });
  });

  describe('Delete Role', () => {
    it('should allow an admin to delete roles', (done) => {
      request
      .delete('/api/roles/3')
        .set('authorization', adminUserToken)
        .expect(200)
        .end((err, response) => {
          expect(response.body.message).to.equal('Role was successfully deleted');
          done();
        });
    });
    it('should prevent a regular user from deleting roles', (done) => {
      request
      .delete('/api/roles/2')
        .set('authorization', regularUserToken)
        .expect(403)
        .end((err, response) => {
          expect(response.body.message).to.equal('Permission denied, admin only');
          done();
        });
    });
    it('should not delete non-existent roles', (done) => {
      request
      .delete('/api/roles/2336')
        .set('authorization', adminUserToken)
        .expect(404)
        .end((err, response) => {
          expect(response.body.message).to
          .equal('Cannot delete a role that does not exist');
          done();
        });
    });
  });
});
