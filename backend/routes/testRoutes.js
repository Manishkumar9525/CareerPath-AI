const express = require("express");
const router = express.Router();

// controller import karo
const { testGroq } = require("../controllers/testController");

// route define
router.get("/test-groq", testGroq);

module.exports = router;