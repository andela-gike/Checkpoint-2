import db from '../models';


const DocumentController = {
  createNewDocument(req, res) {
    if (!req.body.title) {
      return res.status(400).send({
        message:
        'Title field cannot be left blank'
      });
    }
    if (!req.body.content) {
      return res.status(400).send({
        message:
        'Content field cannot be left blank'
      });
    }
    db.documents.findOne({ where: { title: req.body.title } })
      .then((documentExists) => {
        if (documentExists) {
          return res.status(400).send({
            message: 'This document already exists'
          });
        }
        db.documents
          .create({
            title: req.body.title,
            content: req.body.content,
            access: req.body.access || 'public',
            userId: req.decodedToken.userId,
            userRoleId: req.decodedToken.roleId
          })
          .then((document) => {
            res.status(201).send({
              message: 'Document created successfully',
              data: document
            });
          })
          .catch((err) => {
            res.status(400).send({
              message: 'There was an error while creating the document', err
            });
          });
      });
  },

  updateDocument(req, res) {
    db.documents
      .findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({
            message:
            'Cannot update a document that does not exist'
          });
        }
        if (!req.body.title && !req.body.content) {
          return res.status(406).send({
            message: 'No update was done'
          });
        }
        if (parseInt(doc.userId, 10) === req.decodedToken.userId) {
          doc.update({
            title: req.body.title || doc.title,
            content: req.body.content || doc.content,
            access: req.body.access || doc.access
          })
            .then(updatedDoc => res.status(200).send({
              message: 'The document was updated successfully',
              data: updatedDoc
            }));
        } else {
          res.status(401).send({ message: 'Permission denied' });
        }
      });
  },

  deleteDocument(req, res) {
    db.documents
      .findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({
            message:
            'Cannot delete a document that does not exist'
          });
        }
        if (parseInt(doc.userId, 10) === req.decodedToken.userId) {
          doc.destroy()
            .then(() => {
              res.status(200).send({
                message: 'The document was deleted successfully'
              });
            });
        } else {
          res.status(401).send({
            message: ' Permission denied'
          });
        }
      });
  },

  listAllDocuments(req, res) {
    const docAttributes = {
      doc: ['id', 'title', 'content', 'access',
        'userId', 'createdAt', 'updatedAt'],
      user: ['id', 'username']
    };
    let query;
    if (req.decodedToken.roleId === 1) {
      query = { where: {} };
    } else {
      query = {
        where: {
          $or: [
            { access: 'public' },
            { userId: req.decodedToken.userId },
            {
              $and: [
                { access: 'role' },
                { userRoleId: req.decodedToken.roleId }
              ]
            }
          ]
        },
      };
    }
    query = { attributes: docAttributes.doc };
    query.limit = req.query.limit || null;
    query.offset = req.query.offset || null;
    query.order = [['createdAt', 'DESC']];

    db.documents
      .findAll(query)
      .then((docs) => {
        res.status(200).send({ message: docs });
      });
  },

  getSpecificDocument(req, res) {
    db.documents
      .findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({
            message:
            `Document with the id: ${req.params.id} does not exit`
          });
        }
        if (doc.access === 'public' || doc.userId ===
          req.decodedToken.userId) {
          return res.status(200).send({
            message:
            'Document found!',
            data: doc
          });
        }
        if (doc.access === 'role' && doc.userRoleId ===
          req.decodedToken.roleId) {
          return res.status(200).send({
            message:
            'Document found!',
            data: doc
          });
        }
        res.status(401).send({ message: 'Permission denied' });
      });
  },

  searchDocument(req, res) {
    if (!req.query.query) {
      return res.send({ message: 'Search field cannot be empty' });
    }
    const query = {
      where: {
        $and: [
          {
            $or: [
              { access: 'public' },
              { ownerId: req.decodedToken.userId },
              {
                $and: [
                  { access: 'role' },
                  { ownerRoleId: req.decodedToken.roleId }
                ]
              }
            ]
          },
          {
            $or: [
              { title: { like: `%${req.query.query}%` } },
              { content: { like: `%${req.query.query}%` } }
            ]
          }
        ]
      },
      limit: req.query.limit || null,
      offset: req.query.offset || null,
      order: [['createdAt', 'DESC']]
    };
    db.documents
      .findAll(query)
      .then((queriedDoc) => {
        res.status(200).send({ message: queriedDoc });
      });
  }
};

export default DocumentController;
