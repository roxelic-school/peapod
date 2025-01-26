const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.json({hi: "hi"});
});

module.exports = router;