const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');

async function writeDataFile(name, content){
    let dataFilePath = path.join(__dirname, `../../data/${name}.json`); 

    let modified_content = JSON.stringify(content);

    fs.writeFileSync(dataFilePath, modified_content);

    return true;
}

async function read(name){
    let dataFilePath = path.join(__dirname, `../../data/${name}.json`); 

    if (!fs.existsSync(dataFilePath)) {
        return null;
    }

    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
}

module.exports = { writeDataFile, read };