const utils = require('../../../utils');
const express = require('express');
const router = express.Router();

router.get('/admin/gen', async (req, res) => {
    let currentContent = await utils.read("auth") || {};
    let newAuth = utils.genAuthCode();

    while (currentContent[`${newAuth}`]){
        newAuth = utils.genAuthCode();
    }

    currentContent[`${newAuth}`] = false;

    utils.writeDataFile("auth", currentContent)

    res.json({newURL: `http://localhost:3000/api/v1/admin/log?token=${newAuth}`});
});

module.exports = router;