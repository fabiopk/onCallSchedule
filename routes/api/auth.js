import express from "express";
import bcrypt from "bcryptjs";
import auth from "../../middleware/auth.js";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import config from "config";
import expressValidator from "express-validator";

const router = express.Router();
const { check, validationResult } = expressValidator;

// @route GET api/auth
// @desc Test route
// @acess Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    check("email", "email is required")
      .not()
      .isEmpty(),
    check("email", "email should be a valid email").isEmail(),
    check("password", "password should have 6-20 characters").isLength({
      min: 6,
      max: 20
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password, email } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
  }
);

export default router;
