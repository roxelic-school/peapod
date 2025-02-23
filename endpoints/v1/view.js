const express = require('express');
const utils = require('../../utils');
const router = express.Router();

router.get('/view', async (req, res) => {
    let fullContent = utils.convert(await utils.read("times"));

    if (req.query.day != null && req.query.day != ""){
        if (fullContent[`${req.query.day}`]){
            let stash = fullContent;
            fullContent = {};
            fullContent[req.query.day] = stash[`${req.query.day}`];
        }
    } if (req.query.person != null && req.query.person != "") {
        for (const key in fullContent) {
            fullContent[key] = fullContent[key].filter(item => 
                item != null && item[0] != null && item.length >= 1 && item[0][0].includes(req.query.person)
            );
            if (fullContent[key].length == 0) {
                delete fullContent[key];
            }
        }
    }
    
    res.json({fullContent});
});

module.exports = router;