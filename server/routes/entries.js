const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Entry = require("../models/Entry");
const { format } = require("date-fns");

const { isEditableWeek, getCurrentWeek } = require("../utils/weekUtils");

// @route   GET api/entries
router.get("/", auth, async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.user }).sort("-createdAt");
    res.json(entries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/entries/:id
router.get("/:id", auth, async (req, res) => {
  try {
    const entry = await Entry.findOne({
      _id: req.params.id,
      userId: req.user,
    });

    if (!entry) {
      return res.status(404).json({ msg: "Entry not found" });
    }

    res.json(entry);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Entry not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/entries
router.post(
  "/",
  [
    auth,
    [
      check("learned", "Learned content is required").not().isEmpty(),
      check("struggled", "Struggles content is required").not().isEmpty(),
      check("goals", "Goals content is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Get current week (e.g., "2023-W14")
      const currentWeek = format(new Date(), "yyyy-ww");

      const newEntry = new Entry({
        userId: req.user,
        week: currentWeek,
        learned: req.body.learned,
        struggled: req.body.struggled,
        goals: req.body.goals,
      });

      const entry = await newEntry.save();
      res.json(entry);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/entries/:id
// @desc    Update an entry (only current/previous week)
// @access  Private
router.put(
  "/:id",
  [
    auth,
    [
      check("learned", "Learned content is required").not().isEmpty(),
      check("struggled", "Struggles content is required").not().isEmpty(),
      check("goals", "Goals content is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // 1. Find the entry
      const entry = await Entry.findOne({
        _id: req.params.id,
        userId: req.user,
      });

      if (!entry) {
        return res.status(404).json({ msg: "Entry not found" });
      }

      // 2. Check week restriction

      if (!isEditableWeek(entry.week)) {
        return res.status(403).json({
          msg: "Can only edit entries from current or previous week",
          currentWeek: getCurrentWeek(),
          entryWeek: entry.week,
        });
      }

      // 3. Prepare updates
      const { learned, struggled, goals } = req.body;
      const updates = {
        learned,
        struggled,
        goals,
        updatedAt: Date.now(), // Track last modification
      };

      // 4. Apply updates
      const updatedEntry = await Entry.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true } // Return the updated document
      );

      res.json(updatedEntry);
    } catch (err) {
      console.error(err.message);

      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Entry not found" });
      }

      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/entries/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const entry = await Entry.findOneAndRemove({
      _id: req.params.id,
      userId: req.user,
    });

    if (!entry) {
      return res.status(404).json({ msg: "Entry not found" });
    }

    res.json({ msg: "Entry removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
