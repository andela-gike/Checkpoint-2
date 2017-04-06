import chai from 'chai';
import supertest from 'supertest';
import app from '../../routes/index';


const request = supertest.agent(app);
const should = chai.should();


describe('/GET Index Route', () => {
  it('should return the welcome message', (done) => {
    request.get('/')
      .end((err, response) => {
        response.status.should.equal(200);
        response.body.message.should.equal('Welcome to DOCMAN bot!');
        done();
      });
  });
});
