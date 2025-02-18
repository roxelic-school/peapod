const utils = require('../../../utils');
const express = require('express');
const router = express.Router();

router.get('/admin/check',utils.isAdmin, async (req, res) => {
    res.json({status: true});
});

module.exports = router;