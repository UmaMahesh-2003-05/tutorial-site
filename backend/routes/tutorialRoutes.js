const express = require('express');
const router = express.Router();
const Tutorial = require('../models/Tutorial');
const {authenticate, isAdmin } = require("../middleware/auth");

// Create a tutorial
router.post('/create', authenticate, isAdmin, async (req, res) => {
  try {
    const { title, slug, content, tags, category, videos, games } = req.body;
    const tutorial = new Tutorial({ title, slug, content, tags, category, videos, games });
    await tutorial.save();
    res.status(201).json({ message: 'Tutorial created successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tutorials
router.get('/', async (req, res) => {
  try {
    const tutorials = await Tutorial.find();
    res.json(tutorials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single Tutorial by Slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const tutorial = await Tutorial.findOne({ slug });

    if (!tutorial) {
      return res.status(404).json({ message: 'Tutorial not found' });
    }

    res.json(tutorial);
  } catch (error) {
    console.error('Error fetching tutorial by slug:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/tutorials/:id
router.delete("/:id", authenticate, isAdmin, async (req, res) => {
  try {
    await Tutorial.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// PUT /api/tutorials/:id
router.put("/:id", authenticate, isAdmin, async (req, res) => {
  try {
    const { title, slug, category, content, tags, videos, games } = req.body;
    const updated = await Tutorial.findByIdAndUpdate(
      req.params.id,
      { title, slug, category, content, tags, videos, games },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});



module.exports = router;
