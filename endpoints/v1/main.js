const express = require('express');
const utils = require('../../utils');
const router = express.Router();

router.get('/', async (req, res) => {

    // get the amount of times this api has been called
    let {count} = await utils.read('data');
    res.json({hi: count});
});

module.exports = router;