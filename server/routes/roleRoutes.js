import express from 'express';
import RoleController from '../controllers/roleController';
import Authentication from '../middleware/authentication';

const roleRouter = express.Router();

roleRouter.route('/')
  .post(Authentication.verifyUser,
  Authentication.verifyAdmin, RoleController.createNewRole)
  .get(Authentication.verifyUser,
  Authentication.verifyAdmin, RoleController.listAllRoles);

roleRouter.route('/:id')
  .put(Authentication.verifyUser,
  Authentication.verifyAdmin, RoleController.updateRole)
  .delete(Authentication.verifyUser,
  Authentication.verifyAdmin, RoleController.deleteRole)
  .get(Authentication.verifyUser,
  Authentication.verifyAdmin, RoleController.getSpecificRole);

export default roleRouter;
