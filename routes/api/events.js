import express from "express";
import auth from "../../middleware/auth.js";
import Event from "../../models/Event.js";
import expressValidator from "express-validator";
import mongoose from "mongoose";

const { check, validationResult } = expressValidator;

const router = express.Router();

// @route GET api/events
// @desc GET all events
// @access Private
router.get("/", auth, async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// @route POST api/events
// @desc Create new event
// @access Private
router.post(
  "/",
  [
    auth,
    check("user", "user is required")
      .not()
      .isEmpty(),
    check("date", "date is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user, date } = req.body;

    const newEvent = new Event({
      user,
      date: new Date(date)
    });

    try {
      newEvent.save();
      return res.json(newEvent);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/events
// @desc Delete an event
// @access Private
router.put("/:eventId", auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
    return res.status(400).json({ msg: "Id is not valid" });
  }
  const { user, date } = req.body;

  const update = {
    user,
    date: new Date(date)
  };

  try {
    let event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(400).json({ msg: "Event does not exist" });
    }
    event.user = user;
    event.date = new Date(date);
    event.save();
    res.json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/events
// @desc Update an event
// @access Private
router.put(
  "/:eventId",
  [
    auth,
    check("user", "user is required")
      .not()
      .isEmpty(),
    check("date", "date is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
      return res.status(400).json({ msg: "Id is not valid" });
    }
    try {
      let event = await Event.findByIdAndUpdate(req.params.eventId);
      if (!event) {
        return res.status(400).json({ msg: "Event does not exist" });
      }
      res.json(event);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

export default router;
