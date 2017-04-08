import express from 'express';
import Authentication from '../middleware/authentication';
import Pagination from '../controllers/paginationControllers';

const paginationRouter = express.Router();


paginationRouter.route('/users')
  .get(Authentication.verifyUser, Authentication.verifyAdmin, Pagination.getUserPagination);

paginationRouter.route('/documents')
  .get(Authentication.verifyUser, Pagination.getDocumentsPagination);

export default paginationRouter;
