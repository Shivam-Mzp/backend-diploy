const roleMgmt = require("../controllers/roleAuthCtrl.controller");
const { authentication, authorization } = require("../middlewares");
const router = require("express").Router();

// Create a new RoleAuthCtrl
// roleMgmt.create("RoleMgmt2")();

// const roleTitle = roleMgmt.findOneByRoleTitle("RoleMgmt");
// console.log("roleTitle:", roleTitle);

// roleTitle.then((item) => {
//     console.log(item);
// });

// Retrieve all Created RoleAuthCtrls
router.get(
    "/roleAuthCtrl/allRoleAuthCtrls",
    authentication,
    authorization(),
    roleMgmt.findAll
);

// Retrieve a RoleAuthCtrl by the roleAuthCtrlId
router.get(
    "/roleAuthCtrl/oneRoleAuthCtrl/:roleAuthCtrlId",
    authentication,
    authorization(),
    roleMgmt.findOne
);

// Update a RoleAuthCtrl by the roleAuthCtrlId
router.patch(
    "/roleAuthCtrl/update/:roleAuthCtrlId",
    authentication,
    authorization(),
    roleMgmt.update
);

// Delete a RoleAuthCtrl by the roleAuthCtrlId
router.delete(
    "/roleAuthCtrl/delete/:roleAuthCtrlId",
    authentication,
    authorization(),
    roleMgmt.delete
);

module.exports = router;
