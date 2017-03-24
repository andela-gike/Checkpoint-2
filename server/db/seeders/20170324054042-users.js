const Bcrypt = require('bcrypt-nodejs');

const salt = Bcrypt.genSaltSync(10);

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      userName: 'admin',
      password: Bcrypt.hashSync('123456', salt),
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Ike',
      lastName: 'Grace',
      email: 'ikgrace@example.com',
      userName: 'ikgrace',
      password: Bcrypt.hashSync('breadsing', salt),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'foluke',
      lastName: 'Adeleke',
      email: 'folade@example.com',
      userName: 'folade',
      password: Bcrypt.hashSync('uba2345', salt),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Liam',
      lastName: 'Hemsworth',
      email: 'hemsli@example.com',
      userName: 'hemsli',
      password: Bcrypt.hashSync('story098', salt),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Paul',
      lastName: 'Pogba',
      email: 'chesse@example.com',
      userName: 'papog',
      password: Bcrypt.hashSync('incorrect', salt),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users',
  null, {})
};
