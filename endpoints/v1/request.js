const express = require('express');
const utils = require('../../utils');
const router = express.Router();

async function checkusertime(user){
    let currentData = await utils.read("times") || null;
    if (!currentData) utils.writeDataFile("times", utils.times);

    let truecount = 0;

    currentData.forEach(currentData_item => {
        currentData_item.forEach(item => {
            if(item[0] && item[0][0].includes(user)) {
                truecount+=1;
            }
        });    
    });

    return truecount;
}

router.post('/request', async (req, res) => {
    let { text } = req.body;

    if (!utils.validateFormatting(text)) {
        return res.status(400).json({
            error: "Invalid format. Ensure the object matches the required structure and rules.",
        });
    }

    let new_data = await utils.read("times");
    let slots_reserved = [];

    for (const [index, slot] of text.slots.entries()) {
        if (slot === 0) continue; 

        let cango = true;

        for (const item of text.users) {
            if (await checkusertime(item.toLowerCase()) >= 3) {
                cango = false;
            }
        }

        if (new_data[text.Day][index][0] != null) {
            console.log("taken");
        } else if(cango){
            new_data[text.Day][index][0] = [text.users, text.reason];
            await utils.writeDataFile("times", new_data);
            slots_reserved.push(`day ${text.Day}, slot ${index}`);
            console.log(new_data[text.Day][index]);
        }
    }

    console.log(new_data[text.Day]);

    res.json({ message: slots_reserved });
});

module.exports = router;