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

const myLogger = async function (req, res, next) {

    // roxies request counter
    let currentData = await read("data") || {"count": 0};
    currentData.count+=1;
    writeDataFile("data",currentData);

    // keep please, stop removing this
    next();
}

module.exports = { myLogger };