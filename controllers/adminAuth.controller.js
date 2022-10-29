const db = require("../models");
const AdminAuth = db.AdminAuth;
const RoleMgmt = db.RoleMgmt;
const OtpCode = db.OtpCode;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const env = require("../env");
const sendEmailNotifiction = require("../services/emailService/emailService");

const allRoles = async () => {
  let roleArr = [];
  let item = await RoleMgmt.findAll();
  item.forEach((element) => {
    roleArr.push(element.roleName);
  });

  return roleArr;
};

const newToken = (user) => {
  return jwt.sign({ user: user }, env.JWT_SECRET_KEY);
};

// Admin Registration
exports.register = async (req, res) => {
  try {
    // check user exists or not
    let user = await AdminAuth.findOne({ where: { email: req.body.email } });

    // if user exists then throw an error
    if (user) {
      return res
        .status(400)
        .json({ status: "error", message: "User already exists..." });
    }

    // otherwise create a user and then hash the password
    user = await AdminAuth.create(req.body);

    // return data and token
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Admin Login
exports.login = async (req, res) => {
  try {
    // check if a user with that email already exists
    let user = await AdminAuth.findOne({ where: { email: req.body.email } });

    // if not user then throw an error
    if (!user) {
      return res.status(400).json({
        status: "Error",
        message: "You Are Not Registered... register first",
      });
    }

    // if user then match the password
    const match = await user.checkPassword(req.body.password);

    // if not match then throw an error
    if (!match) {
      return res.status(400).json({
        status: "Error",
        message: "Wrong Password or Email... try again",
      });
    }

    // if match then create the token
    let token = newToken(user);

    // return the token to the frontend
    return res.status(200).send({ user: user, token: token });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Retrieve All Registered Admins
exports.findAll = async (req, res) => {
  try {
    let item = await AdminAuth.findAll();
    return res.status(200).send(item);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Retrieve One Registered Admin
exports.findOne = async (req, res) => {
  try {
    let item = await AdminAuth.findByPk(req.params.adminAuthId);
    return res.status(200).send(item);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Update a Registered Admin by the adminAuthId
exports.update = async (req, res) => {
  try {
    let item = await AdminAuth.update(req.body, {
      where: { id: req.params.adminAuthId },
    });

    if (item == 1) {
      res.send({ message: "ROLE Was Updated Successfully." });
    } else {
      res.send({
        message: `Cannot Update ROLE With ID=${req.params.adminAuthId}. Maybe ROLE Was Not Found Or (req.body) Is Empty!`,
      });
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Assign Role To The Admin
exports.assignRole = async (req, res) => {
  try {
    const roleAll = await allRoles();

    const checkRole = req.body.roles.every((elem) => roleAll.includes(elem));

    if (!checkRole) {
      return res.status(400).send({
        message:
          "The Role Being Assigned is Not Available... Please Create The Roll First.",
      });
    }

    let item = await AdminAuth.update(req.body, {
      where: { id: req.params.adminAuthId },
    });

    if (item == 1) {
      res.send({ message: "Assign Role Was Updated Successfully." });
    } else {
      res.send({
        message: `Cannot Assign Role With ID=${req.params.adminAuthId}. Maybe ROLE Was Not Found Or (req.body) Is Empty!`,
      });
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Delete a Registered Admin by the adminAuthId
exports.delete = async (req, res) => {
  try {
    let item = await AdminAuth.destroy({
      where: { id: req.params.adminAuthId },
    });

    if (item == 1) {
      res.send({ message: "Admin Was Deleted Successfully!" });
    } else {
      res.send({
        message: `Cannot Delete Admin With ID=${req.params.adminAuthId}. Maybe Admin Was Not Found!`,
      });
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    // check if a user with that email already exists
    let user = await AdminAuth.findOne({ where: { email: req.body.email } });

    // if not user then throw an error
    if (!user) {
      return res.status(400).json({
        status: "Error",
        message: "You Are Not Registered With Us So Register First.",
      });
    }

    // Create OTP
    let otpUser = await OtpCode.findOne({ where: { email: req.body.email } });

    let myOtp = Math.floor(100000 + Math.random() * 900000);
    let myOtpExpires = new Date().getTime() + 300 * 1000;

    req.body.otpCode = myOtp;
    req.body.otpExpires = myOtpExpires;

    if (otpUser === null) {
      await OtpCode.create(req.body);
    }

    if (otpUser !== null) {
      await OtpCode.update(req.body, {
        where: { id: otpUser.dataValues.id },
      });
    }

    // Sent Varification Email
    sendEmailNotifiction(
      user.email,
      "Hay, Your Reset Password OTP Is Here",
      "forgotPassword",
      {
        otp: myOtp,
        url: env.RESET_PASSWORD_LINK,
      }
    );

    return res.status(200).send({
      status: "Verification OTP Has Been Sent To Your Email.",
      email: req.body.email,
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // check if a user with that email already exists
    let user = await AdminAuth.findOne({ where: { email: req.body.email } });

    // if not user then throw an error
    if (!user) {
      return res.status(400).json({
        status: "Error",
        message: "You Are Not Registered With Us So Register First.",
      });
    }

    // Check given OTP  is correct or not
    const otpUser = await OtpCode.findOne({
      where: { email: req.body.email, otpCode: req.body.otpCode },
    });

    // If not then throw an error
    if (!otpUser) {
      return res.status(400).json({
        status: "Error",
        message: "OTP Is Not Correct Please Enter The Correct OTP",
      });
    }

    // Check if OTP has expired If YES then throw an error
    if (Number(otpUser.otpExpires) <= Number(new Date().getTime())) {
      return res.status(400).json({
        status: "Error",
        message: "Your OTP has expired please resend OTP",
      });
    }

    let password = req.body.password;
    password = await bcrypt.hash(req.body.password, 10);
    await AdminAuth.update(
      { password: password },
      {
        where: { id: user.id },
      }
    );

    return res
      .status(200)
      .send({ status: "Your Password Has Been Updated Successfully." });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
