import express from 'express';
import UserController from '../controllers/userController';
import Authentication from '../middleware/authentication';
import DocumentController from '../controllers/documentController';


const userRouter = express.Router();

userRouter.route('/')
  .get(Authentication.verifyUser, Authentication.verifyAdmin, UserController.listAllUsers)
  .post(UserController.createNewUser);

userRouter.route('/login')
  .post(UserController.loginUser);

userRouter.route('/logout')
  .post(UserController.logoutUser);

userRouter.route('/:id')
  .get(Authentication.verifyUser, UserController.findUserById)
  .put(Authentication.verifyUser, UserController.updateUser)
  .delete(Authentication.verifyUser, Authentication.verifyAdmin, UserController.deleteUser);

userRouter.route('/:id/documents')
  .get(Authentication.verifyUser, UserController.listUserDocuments);

userRouter.route('/:id/document')
  .get(Authentication.verifyUser, DocumentController.findUserDocuments);


export default userRouter;
