const roleMgmt = require("../controllers/roleMgmt.controller");
const { authentication, authorization } = require("../middlewares");
const router = require("express").Router();


// Create a new ROLE
router.post("/role/create", authentication, authorization(), roleMgmt.create);

// Retrieve all Created ROLES
router.get("/roles", authentication, authorization(), roleMgmt.findAll);

// Find a single ROLE with an roleId
router.get("/role/:roleId", authentication, authorization(), roleMgmt.findOne);

// Update a ROLE by the roleId
router.patch("/role/:roleId", authentication, authorization(), roleMgmt.update);

// Delete a ROLE by the roleId
router.delete("/role/:roleId", authentication, authorization(), roleMgmt.delete);


module.exports = router;
