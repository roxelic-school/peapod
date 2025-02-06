require('dotenv').config();

const utils = require('./utils');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.use(utils.myLogger);
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// frontends install
const frontendsDir = path.join(__dirname, 'frontends');
if (fs.existsSync(frontendsDir)) app.use('/frontends', express.static(frontendsDir));

// routes install
const apiRoutes = require('./endpoints/index');
app.use('/api', apiRoutes);

// initialisation
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    let currentContent = await utils.read("auth") || {};
    let newAuth = utils.genAuthCode();
    while (currentContent[`${newAuth}`]){
        newAuth = utils.genAuthCode();
    }
    currentContent[`${newAuth}`] = false;
    utils.writeDataFile("auth", currentContent)
    
    console.log(`Server is running on port ${PORT} \n http://localhost:${PORT}/api/v1/ \n http://localhost:${PORT}/frontends/ \n http://localhost:3000/api/v1/admin/log?token=${newAuth}`);
});