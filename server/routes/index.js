const documentRoutes = require('./documents');
const roleRoutes = require('./role');
const userRoutes = require('./users');

const router = (app) => {
  app.use('api/documents', documentRoutes);
  app.use('api/role', roleRoutes);
  app.use('api/users', userRoutes);
};

module.exports = router;
