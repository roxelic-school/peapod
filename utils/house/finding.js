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

async function findweek(day) {
    let newDay = new Date(day);
    newDay.setDate(newDay.getDate() + 5 - newDay.getDay());

    let days = [];
    
    for (let i = 0; i < 5; i++) {
        let tempDay = new Date(newDay);
        tempDay.setDate(newDay.getDate() - i);
        days.push(tempDay.toLocaleDateString("en-US"));
    }

    days = days.reverse();

    return {
        days
    };
}


async function findUserSpread(name, day){
    let times = await read("times");
    let week = await findweek(day);
    let count = 0;

    week.days.forEach(day => {
        if(times?.[`${day}`]) times[`${day}`].forEach(slot =>{
            if (slot[0] != null && slot[0][0] != null && slot[0][0].includes(name) || false){
                count+=1;
            }
        });
    });

    return count;
}

module.exports = { findweek, findUserSpread };