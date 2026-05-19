import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import { extname } from "path";
import path from "path";
import { Router } from "express";
import sharp from "sharp"; // For image compression
import * as signInController from "../controllers/admin/signInController.js";
import moment from "moment";

const router = Router();


/* Auth API Routes -------------------------------------- */


// POST user login
router.post("/sign-in", signInController.userLogin);

// GET user logout
// router.get("/sign-out", authenticate, signInController.userLogout);

/* Users API Start ----------------------------------- */

// POST get Users (datatables)
// router.post("/getUsers", authenticate, userManagementController.getUsers);

// //dashboard
// router.post(
//   "/dashboard",
//   authenticate,
//   dashboardController.dashboardController
// );

// // POST add new user || GET get all user
// router
//   .route("/users")
//   .post(authenticate, userManagementController.createUser)
//   .get(authenticate, userManagementController.getAllUsers);

// // GET user by id || PATCH update user by id || DELETE delete user by id
// router
//   .route("/users/:id")
//   .get(authenticate, userManagementController.getUserById)
//   .patch(authenticate, userManagementController.updateUserById)
//   .delete(authenticate, userManagementController.deleteUserById);

// router
//   .route("/users_change_status/:id")
//   .patch(authenticate, userManagementController.activeUserById);

/* Users API End ------------------------------------ */

export default router;
