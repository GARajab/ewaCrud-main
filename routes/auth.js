import express from "express"
const router = express.Router()

import authController from "../controllers/auth.js"

router.get("/sign-up", authController.signup_get) //get the signin page
router.post("/sign-up", authController.signup_post) // submit the sign up form
router.get("/sign-in", authController.signin_get) //get the sign in page
router.post("/sign-in", authController.signin_post) // submit the sign in form
router.get("/sign-out", authController.signout) // only sign out

export default router
