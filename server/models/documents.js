module.exports = (sequelize, DataTypes) => {
  const documents = sequelize.define('documents', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: { msg: 'user ID must be an integer' }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'You must provide a Title'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'You cannot have an empty Document'
        }
      }
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
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    },
    freezeTableName: true
  });
  return documents;
};
