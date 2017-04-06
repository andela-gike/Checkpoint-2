module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('roles', [
    {
      title: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('roles',
  null, {})
};
