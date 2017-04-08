import express from 'express';
import Authentication from '../middleware/authentication';
import Pagination from '../controllers/paginationControllers';

const paginationRouter = express.Router();


router.route('/users')
  .get(Authentication.verifyUser, Authentication.verifyAdmin, Pagination.getUserPagination);

router.route('/documents')
  .get(Authentication.verifyUser, Pagination.getDocumentsPagination);

export default paginationRouter;
