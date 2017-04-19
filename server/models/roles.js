module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    classMethods: {
      associate: (models) => {
        roles.hasMany(models.users, {
          onDelete: 'CASCADE', foreignKey: 'roleId' });
      }
    },
    freezeTableName: true
  });
  return roles;
};
