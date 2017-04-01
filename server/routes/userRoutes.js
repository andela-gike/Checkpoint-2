import express from 'express';
import UserController from '../controllers/userController';
import Authentication from '../middleware/authentication';

const userRouter = express.Router();

userRouter.route('/')
  .get(Authentication.verifyUser,
  Authentication.verifyAdmin, UserController.listAllUsers)
  .post(UserController.createNewUser);

userRouter.route('/user/findUser/:identifier')
    .get(UserController.fetchExistingUser);

userRouter.route('/login')
  .post(UserController.loginUser);

userRouter.route('/logout')
  .post(Authentication.verifyUser, UserController.logoutUser);

userRouter.route('/:id')
  .get(Authentication.verifyUser, UserController.findUserById)
  .put(Authentication.verifyUser, UserController.updateUser)
  .delete(Authentication.verifyUser,
  Authentication.verifyAdmin, UserController.deleteUser);

userRouter.route('/:id/documents')
  .get(Authentication.verifyUser,
  Authentication.logout, UserController.listUserDocuments);

export default userRouter;
