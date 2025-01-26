const express = require('express');
const router = express.Router();
const utils = require('../../utils');

router.get('/admin', async (req, res) => {
    let result = "not admin"
    let currentContent = await utils.read("auth");
    let token = req.cookies?.token || null;

    if (currentContent[`${token}`] && currentContent[`${token}`] == true){
        result = "admin";
    }

    res.json({hi: result});
});

module.exports = router;