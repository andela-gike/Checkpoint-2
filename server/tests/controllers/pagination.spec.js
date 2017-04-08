import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server';

const request = supertest.agent(app);
const docs = helpers.goodDocs;
const users = helpers.legitUsers;

const limit = 2;

describe('Pagination Test Suite', () => {
  before((done) => {
    request.post('/api/users/login')
      .type('form')
      .send({ email: 'admin@example.com', password: '123456' })
      .end((err, res) => {
         adminUser = response.body;
        done();
      });
  });
  describe('Users Pagination', () => {
    it('Should return the correct number of users for limit specified', () => {
      request.get(`/api/pagination/users/?limit=${limit}&offset=${undefined}`)
        .set({ 'x-access-token': superAdminDetails.token })
        .expect(200)
        .end((err, res) => {
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(limit);
        });
    });
  });

  describe('Documents Pagination', () => {
    it('Should return the correct number of documents for limit specified', () => {
      request.get(`/api/pagination/documents/?limit=${limit}&offset=${undefined}`)
        .set({ 'x-access-token': superAdminDetails.token })
        .expect(200)
        .end((err, res) => {
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(limit);
        });
    });
  });
});
