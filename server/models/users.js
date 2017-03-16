import Bcrypt from 'bcrypt-nodejs';

const salt = Bcrypt.genSaltSync(10);

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: 3,
          message: 'Your username should be atleast 3 characters long'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 200],
          message: 'Your password must be atleast 6 characters long'
        }
      }
    },
    roleId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 2
    }
  }, {
    classMethods: {
      associate: (models) => {
        users.hasMany(models.documents, { foreignKey: 'userId' });
        users.belongsTo(models.roles, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE'
        });
      }
    },
    instanceMethods: {
      generateHashedPassword() {
        this.password = Bcrypt.hashSync(this.password, salt);
      },
      validatePassword(password) {
        return Bcrypt.compareSync(password, this.password);
      }
    },
    hooks: {
      beforeCreate(user) {
        user.generateHashedPassword();
      },
      beforeUpdate(user) {
        user.generateHashedPassword();
      }
    }
  });
  return users;
};
