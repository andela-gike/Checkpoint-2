import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../routes/index';
import helpers from '../helpers/helpers';

const request = supertest.agent(app);
const users = helpers.legitUsers;



describe('Search Spec', () => {
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

  describe('Search Documents', () => {
    it('should show a regular user search results from public documents', (done) => {
      request.get('/api/search/documents/?q=Digitized')
        .set('authorization', regularUserToken)
        .expect(200)
        .end((err, response) => {
          expect(response.body.message).to.equal('Search results from public documents');
          done();
        });
    });
    it('should ensure the search query is not blank', (done) => {
      request.get('/api/search/documents/?q')
        .set('authorization', regularUserToken)
        .end((err, response) => {
          expect(response.body.message).to.equal('Unallowed search format');
          done();
        });
    });
    it('should ensure a message if no results were found', (done) => {
      request.get('/api/search/documents/?q=ehbssbhf')
        .set('authorization', regularUserToken)
        .expect(404)
        .end((err, response) => {
          expect(response.body.message).to.equal('No results were found');
          done();
        });
    });
  });

  describe('Search Users', () => {
    it('should search for a user by username', (done) => {
      request.get('/api/search/users/?q=ikgrace')
        .set('authorization', regularUserToken)
        .expect(200)
        .end((err, response) => {
          expect(response.body.message).to.equal('Search Results!');
          expect(response.body.data.result[0].userName).to.equal('ikgrace');
          done();
        });
    });
    it('should return a message if the search query is invalid or empty', (done) => {
      request.get('/api/search/users/?q=')
        .set('authorization', regularUserToken)
        .expect(400)
        .end((err, response) => {
          expect(response.body.message).to.equal('Input a valid search term');
          done();
        });
    });
    it('should ensure a message if no results were found', (done) => {
      request.get('/api/search/users/?q=hfgsbs')
        .set('authorization', regularUserToken)
        .expect(404)
        .end((err, response) => {
          expect(response.body.message).to.equal('No results were found');
          done();
        });
    });
  });
});
