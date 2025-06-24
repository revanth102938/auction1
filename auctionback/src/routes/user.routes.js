import { Router } from "express";
import { verifyjwt } from "../middleware/auth.middleware.js";
import {
  registeruser,
  Loginuser,
  Logoutuser,
  getuserdetails,
  getuserbyid
} from "../controllers/user.controller.js";
const router = Router();
router.route("/signup").post(registeruser);
// router.route("/gsignup").post(gsignUp);
router.post("/login", Loginuser);
// router.post("/glogin", glogin);
router.post("/logout", verifyjwt, Logoutuser);
router.get("/getuser", verifyjwt, getuserdetails);
router.get("/me", verifyjwt, getuserdetails);
router.get("/:id", getuserbyid);
export default router;
