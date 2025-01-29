const express = require('express');
const router = express.Router();
const utils = require('../../utils');

router.get('/admin', async (req, res) => {
    let currentContent = await utils.read("auth");
    let dataContent = await utils.read("times");
    let token = req.cookies?.token || null;

    if (currentContent[`${token}`] && currentContent[`${token}`] == true){
        
        if (req.query.type == "emptySlot"){

        } else if (req.query.type == "writeSlot"){

        }

        res.json({hi: "admin"});
    } else {
        return res.json({error: "unauthorised"});
    }
});

module.exports = router;