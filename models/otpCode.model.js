module.exports = (sequelize, Sequelize) => {
  let OtpCode = sequelize.define("OtpCode", {
    email: {
      type: Sequelize.STRING(25),
      allowNull: false,
      unique: true,
    },
    otpCode: {
      type: Sequelize.STRING(6),
      allowNull: false,
    },
    otpExpires: {
      type: Sequelize.STRING(),
      allowNull: false,
    },
  });

  return OtpCode;
};
