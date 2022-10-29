const adminAuth = require("../controllers/adminAuth.controller");
const {
  validateParams,
  authentication,
  authorization,
} = require("../middlewares");
const validationAdminAuth = require("../validation/adminAuth.validation");
const router = require("express").Router();

// Register a New Admin
router.post("/admin/register", adminAuth.register);

// Login a New Admin
router.post(
  "/admin/login",
  validateParams(validationAdminAuth.login),
  adminAuth.login
);

// Retrieve All Admins
router.get(
  "/admin/allAdmins",
  authentication,
  authorization(),
  adminAuth.findAll
);

// Retrieve a single Tutorial with adminAuthId
router.get(
  "/admin/oneAdmin/:adminAuthId",
  authentication,
  authorization(),
  adminAuth.findOne
);

// Update a Tutorial with adminAuthId
router.patch(
  "/admin/update/:adminAuthId",
  authentication,
  authorization(),
  adminAuth.update
);

// Assign Role To The Admin
router.patch(
  "/admin/assignRole/:adminAuthId",
  validateParams(validationAdminAuth.assignRole),
  authentication,
  authorization(),
  adminAuth.assignRole
);

// Delete a Tutorial with adminAuthId
router.delete(
  "/admin/delete/:adminAuthId",
  authentication,
  authorization(),
  adminAuth.delete
);

// For Forgot Password
router.post(
  "/admin/forgotPassword/",
  validateParams(validationAdminAuth.forgotPassword),
  adminAuth.forgotPassword
);

// For Reset Password
router.post(
  "/admin/resetPassword/",
  validateParams(validationAdminAuth.resetPassword),
  adminAuth.resetPassword
);

module.exports = router;
