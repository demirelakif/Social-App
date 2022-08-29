const express = require("express")
const { signup, signin, signout, follow, unfollow } = require("../controllers/User")
const { check } = require("express-validator")
const router = express.Router()
const auth = require("../middleware/Auth");

router.post("/signup", [
    check("name", "Name atleast should be 3 characters").isLength({ min: 3 }),
    check("email", "Email should be valid").isEmail(),
    check("password", "Password atleast 4 character").isLength({ min: 4 })
], signup)

router.post("/signin",signin)

router.post("/signout",signout)

router.put("/follow",auth,follow);

router.put("/unfollow",auth,unfollow);


module.exports = router