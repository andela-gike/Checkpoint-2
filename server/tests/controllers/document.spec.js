import chai from 'chai';
import supertest from 'supertest';
import app from '../../routes/index';
import helpers from '../helpers/helpers';

const request = supertest.agent(app);
const should = chai.should();
const docs = helpers.goodDocs;
const users = helpers.legitUsers;
const expect = chai.expect;


let adminUserToken;
let regularUserToken;
let document;

describe('Document API Spec', () => {
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

  describe('Create Documents', () => {
    it('should allow a user to create a document', (done) => {
      request.post('/api/documents')
        .set('authorization', regularUserToken)
        .send({
          title: docs[0].title,
          content: docs[0].content })
        .expect(201)
        .end((err, response) => {
          response.body.message.should.equal('Document created successfully');
          done();
        });
    });
    it('should prevent a non-logged in user from creating documents', (done) => {
      request.post('/api/documents')
        .send(docs[0])
        .expect(401)
        .end((err, response) => {
          response.body.message.should.equal('Verification failed');
          done();
        });
    });
    it(`should notify the user with a message if both fields
    are blank`, (done) => {
      request.post('/api/documents')
        .set('authorization', adminUserToken)
        .send({
          title: '',
          content: '',
        })
        .expect(400)
        .end((err, response) => {
          response.body.message.should
          .equal('The title or the content of the document is empty');
          done();
        });
    });
    it('should ensure the title field is not blank', (done) => {
      request.post('/api/documents')
        .set('authorization', adminUserToken)
        .send({
          title: '',
          content: docs[2].content
        })
        .expect(400)
        .end((err, response) => {
          response.body.message.should
          .equal('The title or the content of the document is empty');
          done();
        });
    });
    it('should ensure the content field is not blank', (done) => {
      request.post('/api/documents')
        .set('authorization', adminUserToken)
        .send({
          title: docs[2].title,
          content: '',
        })
        .expect(400)
        .end((err, response) => {
          response.body.message.should
          .equal('The title or the content of the document is empty');
          done();
        });
    });
  });

  describe('Update Documents', () => {
    it('Should notify the user if the document was not found', (done) => {
      request.put('/api/documents/6753')
        .set('authorization', regularUserToken)
        .send({
          title: 'Different unknown document',
          content: 'Lovely new words that make you think the world is so easy',
        })
        .expect(404)
        .end((err, response) => {
          response.body.message.should
            .equal('Cannot update a document that does not exist');
          done();
        });
    });
    it('should allow the owner of the document to update it', (done) => {
      request.put('/api/documents/6')
        .set('authorization', regularUserToken)
        .send({
          title: 'Magical beasts and where to find them',
          content: '',
        })
        .expect(200)
        .end((err, response) => {
          response.body.message.should.equal('The document was updated successfully');
          should.exist(response.body.data);
          done();
        });
    });
    it('should not allow updating if both title and content fields are blank', (done) => {
      request.put('/api/documents/6')
        .set('authorization', regularUserToken)
        .send({
          title: '',
          content: '',
        })
        .expect(404)
        .end((err, response) => {
          response.body.message.should.equal('No update detected');
          done();
        });
    });
  });

  describe('Delete Documents', () => {
    it('should fail if the document wasn\'t found', (done) => {
      request.delete('/api/documents/6753')
        .set('authorization', regularUserToken)
        .expect(404)
        .end((err, response) => {
          response.body.message.should
            .equal('Cannot delete a document that does not exist');
          done();
        });
    });
    it('should allow the document owner to delete their document', (done) => {
      request.delete('/api/documents/6')
        .set('authorization', regularUserToken)
        .expect(200)
        .end((err, response) => {
          response.body.message.should.equal('The document was deleted successfully');
          done();
        });
    });
    it('should not allow non-logged in users to delete documents', (done) => {
      request.delete('/api/documents/5')
      .expect(401)
        .end((err, response) => {
          response.body.message.should.equal('Verification failed');
          done();
        });
    });
  });

  describe('View Documents', () => {
    it('should allow a regular user to view public documents', (done) => {
      request.get('/api/documents')
        .set('authorization', regularUserToken)
        .expect(200)
        .end((err, response) => {
          response.body.message.should.equal('Showing all public documents');
          done();
        });
    });
    it('should allow an admin to view all documents', (done) => {
      request.get('/api/documents')
        .set('authorization', adminUserToken)
        .expect(200)
        .end((err, response) => {
          response.body.message.should.equal('Showing all available documents');
          done();
        });
    });
    it('should allow a regular user access to a public document', (done) => {
      request.get('/api/documents/1')
        .set('authorization', regularUserToken)
        .expect(200)
        .end((err, response) => {
          response.body.message.should.equal('Document found!');
          done();
        });
    });
    it('should not allow a regular user access to a private document', (done) => {
      request.get('/api/documents/2')
        .set('authorization', regularUserToken)
        .expect(401)
        .end((err, response) => {
          response.body.message.should.equal('Permission denied');
          done();
        });
    });
    it('should allow a regular user access to a private document they own', (done) => {
      request.get('/api/documents/3')
        .set('authorization', regularUserToken)
        .expect(200)
        .end((err, response) => {
          response.body.message.should.equal('Document found!');
          done();
        });
    });
    it('should return a message if the document doesn\'t exist', (done) => {
      request.get('/api/documents/3432')
        .set('authorization', regularUserToken)
        .expect(404)
        .end((err, response) => {
          response.body.message.should
            .equal('Document with the id: 3432 does not exist');
          done();
        });
    });
  });

  describe('Search Documents', () => {
    it('should show a regular user search results from public documents', (done) => {
      request.get('/api/search/documents/?q=book')
        .set('authorization', regularUserToken)
        .expect(200)
        .end((err, response) => {
          response.body.message.should.equal('Search results from public documents');
          done();
        });
    });
    it('should show an admin search results from all documents', (done) => {
      request.get('/api/search/documents/?q=book')
        .set('authorization', adminUserToken)
        .expect(200)
        .end((err, response) => {
          response.body.message.should.equal('Search results from all documents');
          done();
        });
    });
    it('should ensure the search query is not blank', (done) => {
      request.get('/api/search/documents/?q')
        .set('authorization', regularUserToken)
        .end((err, response) => {
          response.body.message.equal('Search cannot be empty');
          done();
        });
    });
  });
});

