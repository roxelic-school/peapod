const express = require('express');
const utils = require('../../utils');
const router = express.Router();

router.post('/request', async (req, res) => {
    let { text } = req.body;

    if (!utils.validateFormatting(text)){
        return res.status(403).json({error: "inccorrect data"})
    }

    let defaultdata = [
        [null],
        [null],
        [null],
        [null],
        [null],
        [null],
        [null]
    ]

    let currentData = await utils.read("times") || {};
    let newData = currentData[`${text.date}`] || defaultdata;

    let code = {
        "one": true,
        "two": true,
        "three": true
    };

    let userData = 0;

    let amount = await checkuser(text.users, text.date); 
    amount.forEach(item => {
        if (item >= 3) {
            code.one = false
        } if (item > userData) {
            userData = item;
        }
    });

    for (const [index, slot] of text.slots.entries()) {
        if (slot === 0) continue; 
        if (userData >= 3) {
            code.one = false;
            continue;
        }

        if (newData[index][0] == null && code.one && code.two && code.three) {
            newData[index][0] = [text.users, text.reason]
        } else code = false;

        userData += 1;
    }

    currentData[`${text.date}`] = newData;
    utils.writeDataFile("times", currentData);

    res.json(code);
});

async function checkuser(users, date) {
    return Promise.all(users.map(async (user) => {
        return await utils.findUserSpread(user, date);
    }));
}


module.exports = router;