const express = require('express');
const utils = require('../../utils');
const router = express.Router();

router.post('/request', async (req, res) => {
    let { text } = req.body;

    if (!utils.validateFormatting(text)){
        return res.status(403).json({error: "inccorrect data"})
    }

    let currentData = await utils.read("times") || {};
    let newData = currentData[`${text.date}`] || utils.times;
    let code = null;

    for (const [index, slot] of text.slots.entries()) {
        if (slot === 0) continue; 

        // console.log(`${newData[index]} -- ${index}`);
        // console.log(text.users);
        let amount = await checkuser(text.users, text.date); 
        amount.forEach(item => {
            console.log(item);
            if (item >= 3 && code == null) code = 1;
        });

        if (newData[index][0] == null && code == null) newData[index][0] = [text.users, text.reason]
        else if (code == null) code = 2;
    }

    currentData[`${text.date}`] = newData;
    utils.writeDataFile("times", currentData);

    res.json(code || 3);
});

async function checkuser(users, date) {
    return Promise.all(users.map(async (user) => {
        return await utils.findUserSpread(user, date);
    }));
}


module.exports = router;