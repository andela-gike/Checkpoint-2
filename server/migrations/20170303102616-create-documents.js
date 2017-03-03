
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      ownerId: {
        type: Sequelize.INTEGER
      },
      typeId: {
        type: Sequelize.INTEGER
      },
      access: {
        defaultValue: 'public',
        type: Sequelize.STRING,
        validate: {
          isIn: [['private', 'public', 'role']]
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('documents'),
};
