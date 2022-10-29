const db = require("../models");
const RoleMgmt = db.RoleMgmt;


// Create a new ROLE
exports.create = async (req, res) => {
  try {

    // check role exists or not
    let role = await RoleMgmt.findOne({ where: { roleName: req.body.roleName } });

    // if role exists then throw an error
    if (role) {
      return res.status(400).json({
        status: "Error",
        message: "ROLE Already Exists..."
      });
    }

    // otherwise create a role
    let item = await RoleMgmt.create(req.body);
    return res.status(200).send(item);

  } catch (err) {
    return res.status(400).send(err.message);
  }
};


// Retrieve all Created ROLES
exports.findAll = async (req, res) => {
  try {

    let item = await RoleMgmt.findAll();
    return res.status(200).send(item);

  } catch (err) {
    return res.status(400).send(err.message);
  }
};


// Find a single ROLE with an roleId
exports.findOne = async (req, res) => {
  try {

    let item = await RoleMgmt.findByPk(req.params.roleId);
    return res.status(200).send(item);

  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// Update a ROLE by the roleId
exports.update = async (req, res) => {
  try {

    let item = await RoleMgmt.update(req.body, { where: { id: req.params.roleId } });

    if (item == 1) {
      res.send({ message: "ROLE Was Updated Successfully." });
    } else {
      res.send({ message: `Cannot Update ROLE With ID=${req.params.roleId}. Maybe ROLE Was Not Found Or (req.body) Is Empty!` });
    }

  } catch (err) {
    return res.status(400).send(err.message);
  }
};


// Delete a ROLE by the roleId
exports.delete = async (req, res) => {
  try {

    let item = await RoleMgmt.destroy({ where: { id: req.params.roleId } });

    if (item == 1) {
      res.send({ message: "ROLE Was Deleted Successfully!" });
    } else {
      res.send({ message: `Cannot Delete ROLE With ID=${req.params.roleId}. Maybe ROLE Was Not Found!` });
    }

  } catch (err) {
    return res.status(400).send(err.message);
  }
};
