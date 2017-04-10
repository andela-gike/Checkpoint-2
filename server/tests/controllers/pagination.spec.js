import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../../server';


const request = supertest.agent(app);

const limit = 2;
let adminUserToken;

describe('Pagination Test Suite', () => {
  before((done) => {
    request.post('/api/users/login')
    .type('form')
      .send({
        email: 'admin@example.com',
        password: '123456'
      })
      .end((error, response) => {
        adminUserToken = response.body.token;
        done();
      });
  });
  describe('Users Pagination', () => {
    it('Should return the correct number of users for limit specified', () => {
      request.get(`/api/pagination/users/?limit=${limit}&offset=${undefined}`)
        .set('authorization', adminUserToken)
        .expect(200)
        .end((err, response) => {
          expect(Array.isArray(response.body)).to.equal(true);
          expect(response.body.length).to.equal(limit);
        });
    });
  });

  describe('Documents Pagination', () => {
    it('Should return the correct number of documents for limit specified', () => {
      request.get(`/api/pagination/documents/?limit=${limit}&offset=${undefined}`)
        .set('authorization', adminUserToken)
        .expect(200)
        .end((err, response) => {
          expect(Array.isArray(response.body)).to.equal(true);
          expect(response.body.length).to.equal(limit);
        });
    });
  });
});
