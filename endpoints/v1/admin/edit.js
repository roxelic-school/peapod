const utils = require('../../../utils');
const express = require('express');
const router = express.Router();

router.post('/admin/edit',utils.isAdmin, async (req, res) => {
    let { text } = req.body;

    let fullContent = await utils.read("times");
    let defaultdata = [
        [null],
        [null],
        [null],
        [null],
        [null],
        [null],
        [null]
    ]

    switch(text.option) {
        case "delete_date":
            if (fullContent[`${text.date}`]){
                delete fullContent[`${text.date}`];
                utils.writeDataFile("times", fullContent);
                res.json({"message":"succesfully deleted"});
            } else {
                res.json({"message":"incorrect date"});
            }
            break;
        case "delete_slot":
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
            fullContent = {};
            utils.writeDataFile("times", fullContent);
            res.json({"message":"succesfully reset"});
            break;
        case "view_admin_tokens":
            let tokens = await utils.read("auth");
            res.json({tokens});
            break;
        case "remove_token":
            let token = await utils.read("auth");
            if(token[`${text.content}`]){
                token[`${text.content}`] = false;
                utils.writeDataFile("auth", token)
                res.json({"message": "token sucesfully revoked"});
            } else {
                res.json({"message": "token doesnt exist"});
            }
            break;
        default:
            res.json({"message":"incorrect option"});
      } 
});

module.exports = router;