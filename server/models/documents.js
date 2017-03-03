
module.exports = (sequelize, DataTypes) => {
  const documents = sequelize.define('documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ownerId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER,
    access: {
      defaultValue: 'public',
      type: DataTypes.STRING,
      validate: {
        isIn: [['private', 'public', 'role']]
      }
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        documents.belongsTo(models.User, {
          as: 'user',
          onDelete: 'CASACADE',
          foreignKey: {
            allowNull: false,
          },
        });

        documents.belongsTo(models.Role, {
          as: 'role',
          foreignKey: {
            allowNull: false,
          },
        });
      }
    }
  });
  return documents;
};
