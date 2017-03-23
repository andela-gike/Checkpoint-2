import chai from 'chai';
import supertest from 'supertest';
import app from '../routes/index';

const request = supertest.agent(app);
const should = chai.should();

describe('Document API Spec', () => {
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

  describe('Create Documents', () => {
    it('should allow a user to create a document', (done) => {
      request.post('/documents')
        .set('authorization', regularUserToken)
        .send(docs[0])
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.message.should.equal('Document created successfully');
          done();
        });
    });
    it('should prevent a non-logged in user from creating documents', (done) => {
      request.post('/documents')
        .send(docs[0])
        .end((err, response) => {
          response.status.should.equal(401);
          response.body.message.should.equal('Verification failed');
          done();
        });
    });
    it('should ensure the title field is not blank', (done) => {
      request.post('/documents')
        .set('authorization', adminUserToken)
        .send({
          title: '',
          content: docs[2].content
        })
        .end((err, response) => {
          response.status.should.equal(400);
          response.body.message.should.equal('Title field cannot be blank');
          done();
        });
    });
    it('should ensure the content field is not blank', (done) => {
      request.post('/documents')
        .set('authorization', adminUserToken)
        .send({
          title: docs[2].title,
          content: '',
        })
        .end((err, response) => {
          response.status.should.equal(400);
          response.body.message.should.equal('Content field cannot be blank');
          done();
        });
    });
  });

  describe('Update Documents', () => {
    it('should allow the owner of the document to update it', (done) => {
      request.put('/documents/6')
        .set('authorization', regularUserToken)
        .send({
          title: 'Grab Some Books Already!',
          content: '',
        })
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.message.should.equal('The document was updated successfully');
          should.exist(response.body.data);
          done();
        });
    });
    it('should not allow updating if both title and content fields are blank', (done) => {
      request.put('/documents/6')
        .set('authorization', regularUserToken)
        .send({
          title: '',
          content: '',
        })
        .end((err, response) => {
          response.status.should.equal(406);
          response.body.message.should.equal('No update detected');
          done();
        });
    });
  });

  describe('Delete Documents', () => {
    it('should allow the document owner to delete their document', (done) => {
      request.delete('/documents/6')
        .set('authorization', regularUserToken)
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.message.should.equal('The document was deleted successfully');
          done();
        });
    });
    it('should not allow non-logged in users to delete documents', (done) => {
      request.delete('/documents/5')
        .end((err, response) => {
          response.status.should.equal(401);
          response.body.message.should.equal('Verification failed');
          done();
        });
    });
  });

  describe('View Documents', () => {
    it('should allow a user to list all available documents', (done) => {
      request.get('/documents')
        .set('authorization', regularUserToken)
        .end((err, response) => {
          response.status.should.equal(200);
          response.body.message.should.equal('Listing all documents');
          done();
        });
    });
    // it('should only list public documents', (done) => {
    //   chai.request(app)
    //     .get('/documents')
    //     .set('authorization', regularUserToken)
    //     .end((err, res) => {
    //       response.status.should.equal(200);
    //       res.body.message.should.equal('Listing all documents');
    //       should.not.exist(res.body.data.docs[2]);
    //       done();
    //     });
    // });
  });
});

