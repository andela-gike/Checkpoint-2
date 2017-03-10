
const router = require('express').Router();
const documentCtrller = require('../controllers/document');
const userCtrller = require('../controllers/user');

router.use(userCtrller.authenticate);

router.route('/')

  .post(documentCtrller.createDocument)
  .get(documentCtrller.all);

router.route('/:document_id')

  .get(documentCtrller.getSpecificDocument)
  .put(documentCtrller.editDocument)
  .delete(documentCtrller.deleteDocument);

module.exports = router;
