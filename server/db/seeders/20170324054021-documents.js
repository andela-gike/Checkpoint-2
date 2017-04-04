const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('documents', [
    {
      title: 'Digitized impactful Graphic Interface',
      content: `Cumque dolorum laborum sint id. Error cumque ipsa
      culpa est delectus dolores consequatur et laudantium.
      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et
      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.
      Eos repudiandae est sed qui est sapiente temporibus dolorem.`,
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
