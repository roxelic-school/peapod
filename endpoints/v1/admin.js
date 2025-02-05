const express = require('express');
const router = express.Router();
const utils = require('../../utils');

router.get('/admin', async (req, res) => {
    let currentContent = await utils.read("auth") || {};
    let token = req.cookies?.token || null;

    if (currentContent[`${token}`] != null && currentContent[`${token}`] == true){
        res.json({message: "admin"});
    } else {
        return res.json({message: "unauthorised"});
    }
});

module.exports = router;