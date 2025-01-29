const express = require('express');
const utils = require('../../utils');
const router = express.Router();

router.post('/request', async (req, res) => {
    let { text } = req.body;

    if (!utils.validateFormatting(text)){
        return res.status(403).json({error: "inccorrect data"})
    }

    let currentData = utils.read("times") || {};
    let newData = currentData[`${text.Date}`] || utils.times;

    for (const [index, slot] of text.slots.entries()) {
        if (slot === 0) continue; 

        console.log(slot);
    }

    res.json({
        newData
    });
});

module.exports = router;