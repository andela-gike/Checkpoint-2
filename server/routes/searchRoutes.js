import express from 'express';
import DocumentController from '../controllers/documentController';
import UserController from '../controllers/userController';
import Authentication from '../middleware/authentication';

const searchRouter = express.Router();

searchRouter.route('/users')
  .get(Authentication.verifyUser, UserController.searchUser);

searchRouter.route('/documents')
  .get(Authentication.verifyUser, DocumentController.searchDocument);

export default searchRouter;
