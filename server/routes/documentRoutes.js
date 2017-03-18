import express from 'express';
import DocumentController from '../controllers/documentController';
import Authentication from '../middleware/authentication';

const documentRouter = express.Router();

documentRouter.route('/')
  .get(Authentication.verifyUser, DocumentController.listAllDocuments)
  .post(Authentication.verifyUser, DocumentController.createNewDocument);

documentRouter.get('/search', Authentication.verifyUser,
  DocumentController.searchDocument);

documentRouter.route('/:id')
  .get(Authentication.verifyUser, DocumentController.getSpecificDocument)
  .put(Authentication.verifyUser, DocumentController.updateDocument)
  .delete(Authentication.verifyUser, DocumentController.deleteDocument);

export default documentRouter;
