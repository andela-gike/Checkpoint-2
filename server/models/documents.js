module.exports = (sequelize, DataTypes) => {
  const documents = sequelize.define('documents', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    access: {
      type: DataTypes.STRING,
      defaultValue: 'public',
      validate: {
        isIn: [['public', 'private', 'role']]
      },
      allowNull: false
    },
    userRoleId: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        documents.belongsTo(models.users, {
          onDelete: 'CASCADE',
          foreignKey: 'userId'
        });
      }
    }
  });
  return documents;
};
