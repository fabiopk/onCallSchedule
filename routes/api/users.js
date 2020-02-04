import express from "express";
import expressValidator from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import config from "config";

const { check, validationResult } = expressValidator;
const router = express.Router();

// @route POST api/users
// @desc Register new user
// @acess Public

router.post(
  "/",
  [
    check("firstName", "firstName is required")
      .not()
      .isEmpty(),
    check("lastName", "lastName is required")
      .not()
      .isEmpty(),
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

    const { firstName, lastName, password, email } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        firstName,
        lastName,
        email,
        password,
        userType: ["PERITO"]
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
