
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Role.hasMany(models.document);
        Role.hasMany(models.User);
      }
    }
  });
  sequelize.sync();
  return Role;
};
