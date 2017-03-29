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
          return response.status(400).send({
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
      return response.status(406).send({
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
          response.status(401).send({ message: 'Permission denied' });
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
      user: ['id', 'username']
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
      .findAll({ where: query.where, limit: query.limit, offset: query.offset })
      .then((docs) => {
        if (request.decodedToken.roleId === 1) {
          response.status(200).send({ message: 'Showing all available documents', data: docs });
        } else {
          response.status(200).send({ message: 'Showing all public documents', data: docs });
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
    if (!request.query.query) {
      return response.send({ message: 'Search field cannot be empty' });
    }
    // const query = {
    //   where: {
    //     $and: [
    //       {
    //         $or: [
    //           { access: 'public' },
    //           { ownerId: request.decodedToken.userId },
    //           {
    //             $and: [
    //               { access: 'role' },
    //               { ownerRoleId: request.decodedToken.roleId }
    //             ]
    //           }
    //         ]
    //       },
    //       {
    //         $or: [
    //           { title: { like: `%${request.query.query}%` } },
    //           { content: { like: `%${request.query.query}%` } }
    //         ]
    //       }
    //     ]
    //   },
    //   limit: request.query.limit || null,
    //   offset: request.query.offset || null,
    //   order: [['createdAt', 'DESC']]
    // };

    const query = {
      where: {
        $or: [
        // { access: 'public' },
        { title: { $iLike: `%${request.query.q}%` } },
        { content: { $iLike: `%${request.query.q}%` } },
        { access: { $in: ['public'] } }
        // { userId: req.decodedToken.userId }
        ]
      }
    };
    db.documents
      .findAll(query)
      .then((queriedDoc) => {
        if (request.decodedToken.roleId === 1) {
          response.status(200).send({
            message: 'Search results from all documents',
            data: queriedDoc
          });
        } else {
          response.status(200).send({
            message: 'Search results from public documents',
            data: queriedDoc
          });
        }
      });
  }
};

export default DocumentController;
