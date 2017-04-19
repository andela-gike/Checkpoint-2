import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../routes/index';
import helpers from '../helpers/helpers';
import models from '../../models';

const request = supertest.agent(app);
const docs = helpers.goodDocs;
const users = helpers.legitUsers;


let adminUserToken;
let regularUserToken;

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
  after(() => models.sequelize.sync({ force: false }));

  describe('Create Documents by making POST request', () => {
    it('should allow a user to create a document', () => {
      request.post('/api/documents')
        .set('authorization', regularUserToken)
        .send({
          title: docs[2].title,
          content: docs[2].content })
        .expect(201)
        .end((err, response) => {
          expect(response.body).be.an('object');
          expect(response.body.message).to.equal('Document created successfully');
          expect(response.body.data).to.have.property('createdAt');
        });
    });
    it('should prevent a non-logged in user from creating documents', () => {
      request.post('/api/documents')
        .send(docs[0])
        .expect(401)
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('No token was provided');
        });
    });
    it(`should notify the user with a message if both fields
    are blank`, () => {
      request.post('/api/documents')
        .set('authorization', adminUserToken)
        .send({
          title: '',
          content: '',
        })
        .expect(400)
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to
          .equal('The title or the content of the document is empty');
        });
    });
    it('should ensure the title field is not blank', () => {
      request.post('/api/documents')
        .set('authorization', adminUserToken)
        .send({
          title: '',
          content: docs[2].content
        })
        .expect(400)
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to
          .equal('The title or the content of the document is empty');
        });
    });
    it('should ensure the content field is not blank', () => {
      request.post('/api/documents')
        .set('authorization', adminUserToken)
        .send({
          title: docs[2].title,
          content: '',
        })
        .expect(400)
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to
          .equal('The title or the content of the document is empty');
        });
    });
    it('should ensure that a document with the same title is not created twice', () => {
      request.post('/api/documents')
        .set('authorization', adminUserToken)
        .send(docs[2])
        .expect(409)
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to
            .equal('This document already exists');
        });
    });
  });

  describe('making a PUT request to update a document details/content', () => {
    it('Should notify the user if the document was not found', () => {
      request.put('/api/documents/6753')
        .set('authorization', regularUserToken)
        .send({
          title: 'Different unknown document',
          content: 'Lovely new words that make you think the world is so easy',
        })
        .expect(404)
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to
            .equal('Cannot update a document that does not exist');
        });
    });
    it('should allow the owner of the document to update it', () => {
      request.put('/api/documents/6')
        .set('authorization', regularUserToken)
        .send({
          title: 'Magical beasts and where to find them',
          content: '',
        })
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to
          .equal('The document was updated successfully');
          expect(response.body.data).to.exist;
        });
    });
    it('should not allow updating if both title and content fields are blank', () => {
      request.put('/api/documents/6')
        .set('authorization', regularUserToken)
        .send({
          title: '',
          content: '',
        })
        .expect(400)
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('No update detected');
        });
    });
  });

  describe('making a DELETE request to  Documents', () => {
    it('should fail if the document wasn\'t found', () => {
      request.delete('/api/documents/6753')
        .set('authorization', regularUserToken)
        .expect(404)
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to
            .equal('Cannot delete a document that does not exist');
        });
    });
    it('should allow the document owner to delete their document', () => {
      request.delete('/api/documents/6')
        .set('authorization', regularUserToken)
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('The document was deleted successfully');
        });
    });
    it('should not allow non-logged in users to delete documents', () => {
      request.delete('/api/documents/5')
      .expect(401)
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('No token was provided');
        });
    });
  });

  describe('View Documents', () => {
    it('should allow a regular user to view public documents', () => {
      request.get('/api/documents')
        .set('authorization', regularUserToken)
        .end((err, response) => {
          expect(response.body.status).to.equal(200);
        });
    });
    it('Should return documents starting from the most recent', () => {
      request.get('/api/documents')
        .set('authorization', adminUserToken)
        .end((err, response) => {
          expect(response.body.status).to.equal(200);
        });
    });
    it('Should return a user document when a user needs is', () => {
      request.get('/api/documents/users/3')
        .set('authorization', adminUserToken)
        .expect(200)
        .end((err, response) => {
          expect(Array.isArray(response.body)).to.be.true;
          expect(response.body.length).to.be.greaterThan(0);
        });
    });
    it('should allow a regular user access to a public document', () => {
      request.get('/api/documents/1')
        .set('authorization', regularUserToken)
        .end((err, response) => {
          expect(response.body.status).to.equal(200);
        });
    });
    it('should not allow a regular user access to a private document', () => {
      request.get('/api/documents/2')
        .set('authorization', regularUserToken)
        .expect(401)
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Permission denied');
        });
    });
    it('should allow a regular user access to a private document they own', () => {
      request.get('/api/documents/3')
        .set('authorization', regularUserToken)
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.be.an('object');
        });
    });
    it('should return a message if the document doesn\'t exist', () => {
      request.get('/api/documents/3432')
        .set('authorization', regularUserToken)
        .expect(404)
        .end((err, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.message).to
            .equal('Document with the id: 3432 does not exist');
        });
    });
  });
});

