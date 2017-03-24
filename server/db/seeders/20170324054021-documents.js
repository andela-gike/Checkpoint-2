const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('documents', [
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      userId: 1,
      userRoleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      userId: 2,
      userRoleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      userId: 3,
      userRoleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      userId: 4,
      userRoleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      userId: 5,
      userRoleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('documents',
  null, {})
};
