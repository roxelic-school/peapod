const express = require('express');
const router = express.Router();
const utils = require('../../utils');

router.get('/admin', async (req, res) => {
    let currentContent = await utils.read("auth");
    let dataContent = await utils.read("times");
    let token = req.cookies?.token || null;

    if (currentContent[`${token}`] && currentContent[`${token}`] == true){
        
        if (req.query.type == "emptySlot"){
            const day = Number(req.query.day) || 0; 
            const slot = Number(req.query.slot) || 0;

            let newdata = dataContent
            newdata[day][slot] = [null];

            utils.writeDataFile("times", newdata)
        } else if (req.query.type == "writeSlot"){
            const day = Number(req.query.day) || 0; 
            const slot = Number(req.query.slot) || 0;

            let newdata = dataContent
            newdata[day][slot] = [[req.query.users.split(",")], req.query.reason];

            utils.writeDataFile("times", newdata)
        }

        res.json({hi: "admin"});
    } else {
        return res.json({error: "unauthorised"});
    }
});

module.exports = router;