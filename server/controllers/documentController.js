import db from '../models';


const DocumentController = {
  createNewDocument(request, response) {
    if (!request.body.title || !request.body.content) {
      return response.status(400).send({
        message:
        'The title or the content of the document is empty'
      });
    }
    db.documents.findOne({ where: { title: request.body.title } })
      .then((documentExists) => {
        if (documentExists) {
          return response.status(409).send({
            message: 'This document already exists'
          });
        }
        db.documents
          .create({
            title: request.body.title,
            content: request.body.content,
            access: request.body.access || 'public',
            userId: request.decodedToken.userId,
            userRoleId: request.decodedToken.roleId
          })
          .then((document) => {
            response.status(201).send({
              message: 'Document created successfully',
              data: document
            });
          })
          .catch((err) => {
            response.status(400).send({
              message: 'There was an error while creating the document', err
            });
          });
      });
  },

  updateDocument(request, response) {
    if (!request.body.title && !request.body.content) {
      return response.status(400).send({
        message: 'No update detected'
      });
    }
    db.documents
      .findById(request.params.id)
      .then((doc) => {
        if (!doc) {
          return response.status(404).send({
            message:
            'Cannot update a document that does not exist'
          });
        }
        if (parseInt(doc.userId, 10) === request.decodedToken.userId) {
          doc.update({
            title: request.body.title || doc.title,
            content: request.body.content || doc.content,
            access: request.body.access || doc.access
          })
            .then(updatedDoc => response.status(200).send({
              message: 'The document was updated successfully',
              data: updatedDoc
            }));
        } else {
          response.status(403).send({ message: 'Permission denied' });
        }
      });
  },

  deleteDocument(request, response) {
    db.documents
      .findById(request.params.id)
      .then((doc) => {
        if (!doc) {
          return response.status(404).send({
            message:
            'Cannot delete a document that does not exist'
          });
        }
        if (parseInt(doc.userId, 10) === request.decodedToken.userId) {
          doc.destroy()
            .then(() => {
              response.status(200).send({
                message: 'The document was deleted successfully'
              });
            });
        } else {
          response.status(401).send({
            message: ' Permission denied'
          });
        }
      });
  },

  listAllDocuments(request, response) {
    const docAttributes = {
      doc: ['id', 'title', 'content', 'access',
        'userId', 'createdAt', 'updatedAt'],
      user: ['id', 'userName']
    };
    let query;
    if (request.decodedToken.roleId === 1) {
      query = { where: {} };
    } else {
      query = {
        where: {
          access: 'public'
        }
      };
    }
    query.attributes = docAttributes.doc;
    query.limit = request.query.limit || null;
    query.offset = request.query.offset || null;
    query.order = [['createdAt', 'DESC']];
    db.documents
      .findAll({
        where: query.where,
        order: query.order,
        limit: query.limit,
        offset: query.offset
      })
      .then((docs) => {
        if (request.decodedToken.roleId === 1) {
          response.status(200).send({
            message:
            'Showing all documents',
            data: docs
          });
        } else {
          response.status(200).send({
            message:
            'Showing all public documents',
            data: docs
          });
        }
      });
  },

  getSpecificDocument(request, response) {
    db.documents
      .findById(request.params.id)
      .then((doc) => {
        if (!doc) {
          return response.status(404).send({
            message:
            `Document with the id: ${request.params.id} does not exist`
          });
        }
        if (doc.access === 'public' || doc.userId ===
          request.decodedToken.userId) {
          return response.status(200).send({
            message:
            'Document found!',
            data: doc
          });
        }
        if (doc.access === 'role' && doc.userRoleId ===
          request.decodedToken.roleId) {
          return response.status(200).send({
            message:
            'Document found!',
            data: doc
          });
        }
        response.status(401).send({ message: 'Permission denied' });
      });
  },

  searchDocument(request, response) {
    const searchTerm = request.query.q;
    if (!Object.keys(request.query).length || !searchTerm) {
      return response.status(400).send({ message: 'Unallowed search format' });
    }
    const query = {
      where: {
        title: {
          $iLike: `%${searchTerm}%`
        }
      }
    };
    db.documents
      .findAll(query)
      .then((queriedDoc) => {
        if (queriedDoc.length <= 0) {
          return response.status(404).send({
            message: 'No results were found'
          });
        }
        return response.status(200).send({
          message: 'Search results for all documents',
          data: queriedDoc
        });
      });
  }
};

export default DocumentController;
