const fs = require('fs');
const path = require('path');

async function writeDataFile(name, content){
    let dataFilePath = path.join(__dirname, `../../data/${name}.json`); 
    let modified_content = JSON.stringify(content);
    fs.writeFileSync(dataFilePath, modified_content);
    return true;
}

async function read(name){
    let dataFilePath = path.join(__dirname, `../../data/${name}.json`); 
    if (!fs.existsSync(dataFilePath)) return null;
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
}

async function isAdmin(req, res, next) {
    let currentContent = await read("auth") || {};
    let token = req.cookies?.token || null;
    
    if (currentContent[`${token}`] != null && currentContent[`${token}`] == true){
        return next();
    } else {
        return res.status(401).json({ status: 'failure', message: 'Unauthorized' });
    }
}

module.exports = { isAdmin };