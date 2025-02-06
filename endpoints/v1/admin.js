const express = require('express');
const router = express.Router();
const utils = require('../../utils');

router.get('/admin', utils.isAdmin, async (req, res) => {
    res.json({"message":"successfull"});
});

module.exports = router;