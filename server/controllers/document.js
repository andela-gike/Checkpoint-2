const Document = require('./../models/documents');
const User = require('./../models/users');

const documentCtrller = {

  /**
   *  create a new document
   * @param {object} request Request object
   * @param {object} response Response object
   * @return {void} Return void
  */
  createDocument: (request, response) => {
    const access = request.token.body.access;
    const owner = request.token.body.sub;
    const document = new Document();
    document.title = request.body.title;
    document.content = request.body.content;

    if (access === 'Admin') {
      document.access = request.body.access || 'Public';
      document.owner = owner;
    } else {
      document.access = 'Public';
      document.owner = owner;
    }

    const { title, content } = db.validateDocumentsInput(request);
    if (!title) {
      return response.status(400).send({ message: 'Title field cannot be empty' });
    }
    if (!content) {
      return response.status(400).send({ message: 'Content field cannot be empty' });
    }
    // save the all the document and check for any errs
    document.save((err) => {
      if (err) {
        return response.status(400).json(err);
      }
      return response.status(201).json({
        newdocument: document,
        success: true,
        message: 'Document has been created.'
      });
    });
  },
  all: (request, response) => {
    const access = request.token.body.access;
    const owner = request.token.body.sub;
    const limit = request.query.limit;
    const page = request.query.page || request.headers.page;
    const published = request.query.published
    || request.headers.published;
    let query;

    if (access === 'Admin') {
      if (published) {
        const start = new Date(published);
        const end = new Date(start.getTime() + 86400000);

        query = Document.find({ createdAt: { $gte: start, $lt: end } });
      } else {
        query = Document.find();
      }
    } else if (published) {
      const start = new Date(published);
      const end = new Date(start.getTime() + 86400000);

      query = Document.find(
        { $and: [{ createdAt: { $gte: start, $lt: end } },
          { $or: [{ owner }, { access: 'Public' }] }],
        });
    } else {
      query = Document.find({
        $or: [{ owner }, { access: 'Public' }],
      });
    }
    Document.paginate(query.sort('-createdAt'),
      {
        page: parseInt(page, 10), limit: parseInt(limit, 10)
      }).then((documents) => {
        if (!documents) {
          return response.status(404);
        }
        return response.status(200).json({
          newdcuments: documents,
          success: true,
          message: 'All documents have been created.'
        });
      });
  },

   /**
   * Gets specific document from the created document
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @returns {Void} Returns Void
   */
  getSpecificDocument: (request, response) => {
    Document.findById(request.params.document_id, (err,
    document) => {
      if (err || !document) {
        return response.status(404).err;
      }
      return response.status(200).json({
        document,
        success: true,
        message: 'The document you looked for has been displayed.'
      });
    });
  },

  /**
   * Gets all documents belonging to a specific user
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @returns {Void} Returns Void
   */
  getUserDocument: (request, response) => {
    User.findById(request.params.user_id, (err, user) => {
      if (err) {
        return response.status(404).err;
      }
      Document.find({ owner: user.userName }, (err, documents) => {
        if (err) {
          return response.status(500).err;
        }
        return response.status(200).json({
          documents,
          success: true,
          message: 'The document for this user has been displayed'
        });
      });
    });
  },

  /**
   * Edit and update a specific document
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @returns {Void} Returns Void
   */
  editDocument: (request, response) => {
    const access = request.token.body.access;
    const owner = request.token.body.sub;

    Document.findById(request.params.document_id, (err, document) => {
      if (err || !document) {
        return response.status(404).json(err);
      }
      if (owner !== document.owner) {
        return response.status(403)
        .json({ message: 'You are no permitted to edit this document!' });
      }
      // update the document info
      document.title = request.body.title;
      document.content = request.body.content;
      document.owner = owner;
      document.modifiedAt = Date.now();
      if (access === 'Admin') {
        document.access = request.body.access;
      } else {
        document.access = 'Public';
      }

      document.save((err) => {
        if (err) {
          return response.status(500).json(err);
        }
        return response.status(200).json({
          document,
          success: true,
          message: 'Document updated successfully'
        });
      });
    });
  },

  /**
   * Delete dcument that have been created
   * @param {object} request Request object
   * @param {object} response Response Object
   * @return {void} Return void
  */
  deleteDocument: (request, response) => {
    if (!Document) {
      return response.status(404)
      .send({ message: 'Cannot delete a document that does not exist' });
    }
    Document.remove({
      _id: request.params.document_id,
    }, (err) => {
      if (err) {
        return response.status(400).err;
      }
      return response.status(200).json({
        message: 'Document sucessfully deleted'
      });
    });
  },
};

module.exports = documentCtrller;
