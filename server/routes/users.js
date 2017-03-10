
const express = require('express');
const userCtrller = require('../controllers/user');
const documentCtrller = require('../controllers/document');

const router = express.Router();
router.route('/login')
  .post(userCtrller.signin);

router.use(userCtrller.authenticate);

router.route('/logout')
  .post(userCtrller.signout);

router.route('/')
  .post(userCtrller.createNewuser)
  .get(userCtrller.all);

router.route('/:user_id')
  .get(userCtrller.getSpecificUser)
  .put(userCtrller.updateUser)
  .delete(userCtrller.deleteUser);

router.route('/:user_id/documents')
  .get(documentCtrller.getUserDocument);

module.exports = router;
