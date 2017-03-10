const router = require('express').Router();
const roleCtrller = require('../controllers/role');
const userCtrller = require('../controllers/user');

router.use(userCtrller.authenticate);

router.route('/')

  .post(roleCtrller.createRole)
  .get(roleCtrller.all);

router.route('/:role_id')
  .put(roleCtrller.updateRole)
  .delete(roleCtrller.deleteRole);

module.exports = router;
