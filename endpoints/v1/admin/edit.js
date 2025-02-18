const express = require('express');
const utils = require('../../../utils');
const router = express.Router();

router.post('/admin/edit', utils.isAdmin, async (req, res) => {
    let text = req.body;

    let fullContent = await utils.read("times") || {};
    let defaultdata = [
        [null],
        [null],
        [null],
        [null],
        [null],
        [null],
        [null]
    ]

    if(text?.option && text.option != null) switch(text.option) {
        case "delete_date":
            await utils.backup();
            
            if (fullContent[`${text.date}`]){
                delete fullContent[`${text.date}`];
                utils.writeDataFile("times", fullContent);
                res.json({"message":"succesfully deleted"});
            } else {
                res.json({"message":"incorrect date"});
            }
            break;
        case "delete_slot":
            await utils.backup();

            if (fullContent[`${text.date}`]){
                if ((fullContent[`${text.date}`].length - 1) >= text.index || 0 > text.index){
                    fullContent[`${text.date}`][text.index] = [null];
                    utils.writeDataFile("times", fullContent);
                    res.json({"message":"succesfully cleared data"});
                } else {
                    res.json({"message":"impropper index"});
                }
            } else {
                res.json({"message":"incorrect date"});
            }
            break;
        case "force_slot":
            await utils.backup();

            if (fullContent[`${text.date}`]){
                if ((fullContent[`${text.date}`].length - 1) >= text.index || 0 > text.index){
                    fullContent[`${text.date}`][text.index] = text.content;
                    utils.writeDataFile("times", fullContent);
                    res.json({"message":"succesfully forced"});
                } else {
                    res.json({"message":"impropper index"});
                }
            } else {
                fullContent[`${text.date}`] = defaultdata;
                if ((fullContent[`${text.date}`].length - 1) >= text.index || 0 > text.index){
                    fullContent[`${text.date}`][text.index] = text.content;
                    utils.writeDataFile("times", fullContent);
                    res.json({"message":"succesfully forced"});
                } else {
                    res.json({"message":"impropper index"});
                }
            }
            break;
        case "reset":
            await utils.backup();

            fullContent = {};
            utils.writeDataFile("times", fullContent);
            res.json({"message":"succesfully reset"});
            break;
        case "view_admin_tokens":
            let tokens = await utils.read("auth");
            res.json({tokens});
            break;
        case "remove_token":
            await utils.backup();

            let token = await utils.read("auth");
            if(token[`${text.content}`]){
                token[`${text.content}`] = false;
                utils.writeDataFile("auth", token)
                res.json({"message": "token sucesfully revoked"});
            } else {
                res.json({"message": "token doesnt exist"});
            }
            break;
        case "restore":
            let backup = await utils.read("backup");
            utils.writeDataFile("times", backup);

            res.json({"message": "sucesfully restored"});
            break;
        default:
            res.json({"message":"incorrect option"});
      } 
});

module.exports = router;