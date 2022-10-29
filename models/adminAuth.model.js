const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  let AdminAuth = sequelize.define("AdminAuth", {
    fullName: {
      type: Sequelize.STRING(25),
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(25),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    mobile: {
      type: Sequelize.STRING(10),
      allowNull: false,
      defaultValue: "XXXXXXXXXX",
    },
    roles: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
      get() {
        return this.getDataValue("roles").split(";");
      },
      set(val) {
        this.setDataValue("roles", val.join(";"));
      },
    },
  });

  AdminAuth.prototype.checkPassword = async function (password) {
    const passwordHash = this.password;
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, passwordHash, (err, same) => {
        if (err) {
          return reject(err);
        }
        resolve(same);
      });
    });
  };

  AdminAuth.beforeCreate((user) => {
    return bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
      })
      .catch(() => {
        throw new Error();
      });
  });

  return AdminAuth;
};
