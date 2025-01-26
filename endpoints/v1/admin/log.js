const utils = require('../../../utils');
const express = require('express');
const router = express.Router();

router.get('/admin/log', async (req, res) => {
    let token = req.query.token;
    let currentContent = await utils.read("auth");

    if (!currentContent[`${token}`] && currentContent[`${token}`] == false){
        currentContent[`${token}`] = true;
        utils.writeDataFile("auth", currentContent)

        res.cookie('token', token, { httpOnly: true });
        res.json({hi: "hi"});
    } else {
        res.json({what: "you are a bad student ):"});
    }
});

module.exports = router;