const db = require("../models");
const RoleAuthCtrl = db.RoleAuthCtrl;


// Create a new RoleAuthCtrl
exports.create = (roleTitleData) => async (req, res) => {

    // check roleTitle exists or not
    let roleTitle = await RoleAuthCtrl.findOne({ where: { roleTitle: roleTitleData } });

    // if roleTitle not exists then create a roleTitle
    if (!roleTitle) {
        const item = await RoleAuthCtrl.create({ roleTitle: roleTitleData });
        console.log("item", item);
        console.log("RoleAuthCtrl Created");
    }

};


// Retrieve all Created ROLES
exports.findAll = async (req, res) => {
    try {

        let item = await RoleAuthCtrl.findAll();
        return res.status(200).send(item);

    } catch (err) {
        return res.status(400).send(err.message);
    }
};


// Find a single RoleAuthCtrl with an roleAuthCtrlId
exports.findOne = async (req, res) => {
    try {

        let item = await RoleAuthCtrl.findByPk(req.params.roleAuthCtrlId);
        return res.status(200).send(item);

    } catch (err) {
        return res.status(400).send(err.message);
    }
};


// Find a single RoleAuthCtrl with an roleTitle
exports.findOneByRoleTitle = async (roleTitle) => {

    let item = await RoleAuthCtrl.findOne({
        where: { roleTitle: roleTitle },
    });
    return item;

};


// Update a RoleAuthCtrl by the roleAuthCtrlId
exports.update = async (req, res) => {
    try {

        let item = await RoleAuthCtrl.update(req.body, { where: { id: req.params.roleAuthCtrlId } });

        if (item == 1) {
            res.send({ message: "RoleAuthCtrl Was Updated Successfully." });
        } else {
            res.send({ message: `Cannot Update RoleAuthCtrl With ID=${req.params.roleAuthCtrlId}. Maybe RoleAuthCtrl Was Not Found Or (req.body) Is Empty!` });
        }

    } catch (err) {
        return res.status(400).send(err.message);
    }
};


// Delete a RoleAuthCtrl by the roleAuthCtrlId
exports.delete = async (req, res) => {
    try {

        let item = await RoleAuthCtrl.destroy({ where: { id: req.params.roleAuthCtrlId } });

        if (item == 1) {
            res.send({ message: "RoleAuthCtrl Was Deleted Successfully!" });
        } else {
            res.send({ message: `Cannot Delete RoleAuthCtrl With ID=${req.params.roleAuthCtrlId}. Maybe RoleAuthCtrl Was Not Found!` });
        }

    } catch (err) {
        return res.status(400).send(err.message);
    }
};
