const express = require('express');
const utils = require('../../utils');
const router = express.Router();

router.get('/view', async (req, res) => {
    let fullContent = await utils.read("times");

    if (req.query.day != null){
        if (fullContent[`${req.query.day}`]){
            fullContent = fullContent[`${req.query.day}`];
        }
    } if (req.query.person != null) {
        for (const key in fullContent) {
            fullContent[key] = fullContent[key].filter(item => 
                item[0] != null && item.length >= 1 && item[0][0].includes(req.query.person)
            );
        }
    }
    
    res.json({fullContent});
});

module.exports = router;