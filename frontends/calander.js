// to use this script you will need to add:
// calander="calander"
// selected_date="selected_date"
// date="date"
// calander_left="calander-left"
// calander_right="calander-right"

// enviromental variables
let fourthwall = document.currentScript;

// functions, dont touch these work perfectly

//  this one works by finding the month of the day given into it and returning the days of the relative month, the end days of the previous month and the start of the next
function loadDays(currentday){
    // variables
    let days = [];
    let month = -1;
    let calander = document.getElementById(fourthwall.getAttribute("calander"));
    let selected_date = document.getElementById(fourthwall.getAttribute("selected_date"));
    let date = document.getElementById(fourthwall.getAttribute("date"));
    let months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

    let today = {
        "date": [currentday.getDate(), currentday.getMonth()+1, currentday.getFullYear()],
        "days": new Date(currentday.getFullYear(), currentday.getMonth()+1, 0).getDate(),
        "startDay": new Date(currentday.getFullYear(), currentday.getMonth(), 1).getDay() == 0 ?
            7:
            new Date(currentday.getFullYear(), currentday.getMonth(), 1).getDay(),
        "endDay": new Date(currentday.getFullYear(), currentday.getMonth()+1, 0).getDay(),
        "overlap": {
            "previous": new Date(currentday.getFullYear(), currentday.getMonth(), 0).getDate(),
            "next": new Date(currentday.getFullYear(), currentday.getMonth()+2, 0).getDate()
        }
    }
    
    let build = {
        "start": today.overlap.previous - (today.startDay - 2),
        "end": 7 - today.endDay,
        "built": false
    }

    selected_date.textContent = currentday.toLocaleDateString("en-US");
    currentday.setDate(1);
    date.textContent = `${months[today.date[1] - 1]} ${today.date[2]} | ${currentday.toLocaleDateString("en-US")}`

    if(build.start <= today.overlap.previous) days.push([build.start, today.date[1] + month, today.date[2]]);
    else month = 0;

    // netsing yay, this can probably be done way more effeciently but im 90 hours deep and im probably getting a £5 amazon voucher for this
    while(!build.built){
        let day = [1, today.date[1] + month, today.date[2]];

        if (day[1] == 13){
            day[1] = 1;
            day[2] += 1;
        } else if (day[1] == 0){
            day[1] = 12;
            day[2] -= 1;
        }

        if (days.length > 0) day[0] = days[days.length - 1][0] + 1;

        if (day[0] > today.overlap.previous && month === -1){
            month = 0;
            day = [1, today.date[1] + month, today.date[2]];
            if (day[1] == 0){
                day[1] = 12;
                day[2] -= 1;
            }
        } else if (day[0] > today.days && month === 0){
            month = 1;
            day = [1, today.date[1] + month, today.date[2]];
            if (day[1] == 13){
                day[1] = 1;
                day[2] += 1;
            }
        }
        
        if (day[0] > build.end && month === 1){
            build.built = true;
        } else {
            days.push(day);
        }
    }
    
    // a loop to spawn all the nessisary days
    days.forEach(item => {
        let newel = document.createElement("P");
        newel.textContent = item[0];
        newel.id = `${item[1]}/${item[0]}/${item[2]}`;
        newel.addEventListener("click", ChangeSelectedDay);
        calander.appendChild(newel);
    });
}

//  this one just removes all elements, -1 month and runs the function which generates the days
function ChangeMonthLeft(){
    let gathering = new Date(date.textContent.split(" | ")[1]);
    gathering.setMonth(gathering.getMonth() - 1);
    calander.innerHTML = "";
    loadDays(gathering);
}

//  same as above but yk with +1
function ChangeMonthRight(){
    let gathering = new Date(date.textContent.split(" | ")[1]);
    gathering.setMonth(gathering.getMonth() + 1);
    calander.innerHTML = "";
    loadDays(gathering);
}

// this one updates the query paramter so when refreshing it will stay (:
function ChangeSelectedDay(event){
    const searchParams = new URLSearchParams(window.location.search);

    document.getElementById("selected_date").textContent = event.target.id;

    searchParams.set("date", event.target.id);
    window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
}


// execute
const searchParams = new URLSearchParams(window.location.search);

document.getElementById(fourthwall.getAttribute("calander_left")).addEventListener("click", ChangeMonthLeft);
document.getElementById(fourthwall.getAttribute("calander_right")).addEventListener("click", ChangeMonthRight);

if (searchParams.has('date')) loadDays(new Date(searchParams.get('date')));
else loadDays(new Date());