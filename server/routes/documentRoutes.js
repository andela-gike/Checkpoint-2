import express from 'express';
import Authentication from '../middleware/authentication';
import DocumentController from '../controllers/documentController';


const documentRouter = express.Router();

documentRouter.route('/')
  .get(Authentication.verifyUser, DocumentController.listAllDocuments)
  .post(Authentication.verifyUser, DocumentController.createNewDocument);


documentRouter.route('/:id')
  .get(Authentication.verifyUser, DocumentController.getSpecificDocument)
  .put(Authentication.verifyUser, DocumentController.updateDocument)
  .delete(Authentication.verifyUser, DocumentController.deleteDocument);

documentRouter.route('/users/:id')
  .get(Authentication.verifyUser, DocumentController.findUserDocuments);


export default documentRouter;
