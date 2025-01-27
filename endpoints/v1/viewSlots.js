const express = require('express');
const utils = require('../../utils');
const router = express.Router();

router.get('/viewSlots', async (req, res) => {
    let currentData = await utils.read("times");

    if (req.query.type == "day") {
        currentData = currentData[req.query.content];
    } else if (req.query.type == "user") {
        let new_data = [];

        currentData.forEach((child0, index0) => {
            child0.forEach((child1, index1) => {
                if(child1[0] != null && child1[0][0] != null && child1[0][0].includes(req.query.content)){
                    new_data.push(`day: ${index0 + 1} slot: ${index1 + 1}`);
                }
            })
        });

        currentData = new_data;
    } 

    res.json({ slots: currentData });
});

module.exports = router;