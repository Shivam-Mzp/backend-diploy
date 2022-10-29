
module.exports = (sequelize, Sequelize) => {
    let RoleAuthCtrl = sequelize.define("RoleAuthCtrl", {
        roleTitle: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
        },
        adminRoles: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "",
            get() {
                return this.getDataValue("adminRoles").split(";");
            },
            set(val) {
                this.setDataValue("adminRoles", val.join(";"));
            },
        },
    });

    return RoleAuthCtrl;
};
