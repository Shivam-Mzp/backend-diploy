
module.exports = (sequelize, Sequelize) => {
    let RoleMgmt = sequelize.define("RoleMgmt", {
        roleName: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
        }
    });

    return RoleMgmt;
};
