
// OtherLife 11/15/2020, 10:00:00 PM 11/15/2020, 12:00:00 AM 22.99990777777778
let date1 = new Date();
date1.setDate(15);
date1.setHours(10);
date1.setMinutes(0);

/**
 * givent two dates, it gives the difference in ms, minutes, hours, days, and years.
 * 
 * @param date1 first day
 * @param date2  second day
 * 
 * @return Object date2 -date1 in {ms: ms, minutes: minutes, hours: hours, days: days, years: years}
 */
function timeBetween (date1, date2) {
    let ms = date2.getTime() - date1.getTime();
    let minutes = ms/(1000*60);
    let hours = minutes/60;
    let days = hours/24;
    let years = days/365;
    return {ms: ms, minutes: minutes, hours: hours, days: days, years: years};
}

/**
 * give a date give me 12:00:00 am and
 * 11:59:59 of that date 
 */
Date.prototype.oneDay = function () {
    this.dayStart = new Date(this)
    this.dayStart.setHours(0)
    this.dayStart.setMinutes(0)
    this.dayStart.setSeconds(0)
    this.dayEnd = new Date(this)
    this.dayEnd.setHours(23)
    this.dayEnd.setMinutes(59)
    this.dayEnd.setSeconds(59)
}

/**
 * 
 * @param {a date} date 
 * @returns {a date} with it's first hour of the day 
 * Example:  give a date give me 12:00:00 am 
 */
function dayStarts (date){
    date.oneDay()
    return date.dayStart
}

/**
 * 
 * @param {a date} date 
 * @returns {a date} with it's first hour of the day 
 * Example:  give a date give me 11:59:59 of that date 
 */
 function dayEnds (date){
    date.oneDay()
    return date.dayEnd
}
/**
 * 
 * @returns {String} Sun 12
 */
Date.prototype.myDay = function () {
    if(this.getDay() == 0) {return `Sun ${this.getDate()} `}
    if(this.getDay() == 1) {return `Mon ${this.getDate()} `}
    if(this.getDay() == 2) {return `Tue ${this.getDate()} `}
    if(this.getDay() == 3) {return `Wed ${this.getDate()} `}
    if(this.getDay() == 4) {return `Thr ${this.getDate()} `}
    if(this.getDay() == 5) {return `Fri ${this.getDate()} `}
    if(this.getDay() == 6) {return `Sat ${this.getDate()} `}
}

/**
 * when called on a date, it gives the date ex Date with date 15
 * @weekStart ex Sun 14
 * @weekEnd ex Sat 20
 */
Date.prototype.weekDay = function () {
    if(this.getDay() == 0) {this.weekStart = `Sun ${this.getDate()}`, this.weekEnd = `Sat ${this.getDate() + 6}`}
    if(this.getDay() == 1) {this.weekStart = `Sun ${validityCheck(this,this.getDate()-1)}`, this.weekEnd = `Sat ${validityCheck(this,this.getDate() + 5)}`}
    if(this.getDay() == 2) {this.weekStart = `Sun ${validityCheck(this,this.getDate()-2)}`, this.weekEnd = `Sat ${validityCheck(this,this.getDate() + 4)} ` }
    if(this.getDay() == 3) {this.weekStart = `Sun ${validityCheck(this,this.getDate()-3)}`, this.weekEnd = `Sat ${validityCheck(this,this.getDate() + 3)}`}
    if(this.getDay() == 4) {this.weekStart = `Sun ${validityCheck(this,this.getDate()-4)}`, this.weekEnd = `Sat ${validityCheck(this,this.getDate() + 2)}`}
    if(this.getDay() == 5) {this.weekStart = `Sun ${validityCheck(this,this.getDate()-5)}`, this.weekEnd = `Sat ${validityCheck(this,this.getDate() + 1)}`}
    if(this.getDay() == 6) {this.weekStart = `Sun ${validityCheck(this,this.getDate()-6)}`, this.weekEnd = `Sat ${this.getDate()}`}
}
/**
 * month number to three leters monthName {string} converter
 */
Date.prototype.myMonth = function() {
    if (this.getMonth() == 0){this.monthName = "Jan"};
    if (this.getMonth() == 1){this.monthName = "Feb"};
    if (this.getMonth() == 2){this.monthName = "Mar"};
    if (this.getMonth() == 3){this.monthName = "Apr"};
    if (this.getMonth() == 4){this.monthName = "May"};
    if (this.getMonth() == 5){this.monthName = "Jun"};
    if (this.getMonth() == 6){this.monthName = "Jul"};
    if (this.getMonth() == 7){this.monthName = "Aug"};
    if (this.getMonth() == 8){this.monthName = "Sep"};
    if (this.getMonth() == 9){this.monthName = "Oct"};
    if (this.getMonth() == 10){this.monthName = "Nov"};
    if (this.getMonth() == 11){this.monthName = "Dec"};
  };
/**
 * called on a date
 * @returns {number} date of that day
 * for each date @weekStartDate is the Sunday of that week 
 * and @weekEndDate is the saturday of that week 
 */

Date.prototype.weekDate = function () {
    if(this.getDay() == 0) {this.weekStartDate = this.getDate(), this.weekEndDate =  validityCheck(this, this.getDate() + 6)}
    if(this.getDay() == 1) {this.weekStartDate = validityCheck(this,this.getDate()-1), this.weekEndDate = validityCheck(this, this.getDate() + 5)}
    if(this.getDay() == 2) {this.weekStartDate = validityCheck(this,this.getDate()-2), this.weekEndDate = validityCheck(this, this.getDate() + 4)}
    if(this.getDay() == 3) {this.weekStartDate = validityCheck(this,this.getDate()-3), this.weekEndDate = validityCheck(this, this.getDate() + 3)}
    if(this.getDay() == 4) {this.weekStartDate = validityCheck(this,this.getDate()-4), this.weekEndDate = validityCheck(this, this.getDate() + 2)}
    if(this.getDay() == 5) {this.weekStartDate = validityCheck(this,this.getDate()-5), this.weekEndDate = validityCheck(this, this.getDate() + 1)}
    if(this.getDay() == 6) {this.weekStartDate = validityCheck(this,this.getDate()-6), this.weekEndDate =  this.getDate() }
}




function timeZone(string) {
    if(string.includes('Pacific')) {
        return 'America/Los_Angeles'
    } else if (string.includes('Eastern')) {
        return 'America/New_York'
    } else if (string.includes('Central')) {
        return 'America/Chicago'
    } else if (string.includes('Mountain')) {
        return 'America/Denver'
    } else if (string.includes('Alaska')) {
        return ('America/Anchorage')
    } else if (string.includes('Hawaii')) {
        return ('Pacific/Honolulu');
    } else {
        return ('Etc/GMT')
    }
}
let date10 = new Date();
updateDate(date1, 1);
/**
 * @param {date, number}
 * @return {date} the new date shifted by the number 
 * example: updateDate(today, 1) gives you the next day
 */
function updateDate(currentDate, shift) {
    if(shift < 0 && Math.abs(shift) > currentDate.getDate()) {
        currentDate.setMonth(currentDate.getMonth() - 1) 
        currentDate.setDate(currentDate.getDate() +  shift + daysInAMonth(currentDate.getMonth()));
        return currentDate;
    }
    currentDate.setDate(currentDate.getDate() +  shift);
    return currentDate; //updated date
}

/**
 * number days in a month
 * @param {number} month 
 * @returns {number} days in a month
 */
function daysInAMonth (month) {
    let longMonths = ('0, 2, 4, 6, 7, 9, 11')
    if(longMonths.includes(month.toString())) {
        return 31;
    } else if(month == 2) {
        return 28;
    } else {
        return 30;
    }
}

/**
 * @param {Date} date
 * @param {number} days
 * @return {number} day updated incase it's below 0 or above number of dates in that month
 */
function validityCheck (date, day) {
    if(day < 0) {
        return day + daysInAMonth(date.getMonth() - 1)
    } else if (day > 23) {
        if(day > daysInAMonth(date.getMonth())) {
            return day - daysInAMonth(date.getMonth());
        } else {
            return day;
        }
    } else {
        return day;
        
    }
}

/**
 * given a date, gives back an object of weekstart date and 
 * week end date of that includes the given date.
 * @param {date} 
 * @return {Date} start and end date of the week the {input date} is in
 * ex: oneWeek(sun 11/15) gives 11/15 and 11/21(22)
 */
function oneWeek(date) {
    let week = new Date(date);
    let weekStartDate = new Date(date);
    let weekEndDate = new Date(date);
    week.weekDate();
    
    let weekBegins = validityCheck(week, week.weekStartDate);
    let weekEnds = validityCheck(week, week.weekEndDate);
    weekStartDate.setDate(weekBegins);
    weekStartDate.setHours(0)
    weekStartDate.setMinutes(0)
    weekStartDate.setSeconds(0)
    weekEndDate.setDate(weekEnds);

    if(week.weekStartDate < week.weekEndDate) {
        weekStartDate.setMonth(week.getMonth())
        weekEndDate.setMonth(week.getMonth())
    } else {
        weekStartDate.setMonth(week.getMonth())
        weekEndDate.setMonth(week.getMonth() + 1)
    }
    //two scenario ex 1 -> 8 or 29 -> 3
    
    // if(week.getDate() > week.weekEndDate ) {

    //     weekEndDate.setMonth(week.getMonth() + 1)
    // }

    // if(week.weekStartDate > week.weekEndDate) {
    //     weekStartDate.setMonth(week.getMonth() - 1)
    // }
    weekEndDate.setHours(23);
    weekEndDate.setMinutes(59);
    weekEndDate.setSeconds(59);
    return {weekStartDate: weekStartDate, weekEndDate: weekEndDate}

}

/**
 * week starting time
 * @param {Date} date 
 * @returns {Date} week starting time
 */
function weekStarts(date){
    let weekEdges = oneWeek(date)
    return weekEdges.weekStartDate
    
}

/**
 * week ending time
 * @param {Date} date 
 * @returns {Date} week ending time
 */
 function weekEnds(date){
    let weekEdges = oneWeek(date)
    return weekEdges.weekEndDate
    
}


/**
 * returns start date and end date of week1 (current week), week2 (week before), week3, week 4
 * example of output: 
 *      {"week1":{"weekStartDate":"2021-01-17T08:00:00.854Z","weekEndDate":"2021-01-24T07:59:59.854Z"},
 *      "week2":{"weekStartDate":"2021-01-10T08:00:00.855Z","weekEndDate":"2021-01-17T07:59:59.855Z"},
 *      "week3":{"weekStartDate":"2021-01-03T08:00:00.855Z","weekEndDate":"2021-01-10T07:59:59.855Z"},
 *      "week4":{"weekStartDate":"2020-12-26T08:00:00.855Z","weekEndDate":"2021-01-03T07:59:59.855Z"}}
 * @returns {object} {week1: @function oneweek(onCurrentWeek), week: @function oneWeek(ontheweekBefore)}
 */

function monthDates () {
    let week1Date = new Date();
    let week1 = oneWeek(week1Date);
    let week2Date = new Date();
    updateDate(week2Date, -7);
    let week2 = oneWeek(week2Date);

    let week3Date = new Date();
    updateDate(week3Date, -14)
    let week3 = oneWeek(week3Date);

    let week4Date = new Date();
    updateDate(week4Date, -21)
    let week4 = oneWeek(week4Date);
    //quick fix 

    return {week1: week1, week2: week2, week3: week3, week4: week4}
}

let date = new Date();

function sortObjectsByKey (object) {
    let returnedObje = {};
    let keys = Object.keys(object);
    keys.sort();
    keys.forEach((key) => {
      returnedObje[key] = object[key]
    })
    return returnedObje;
  }

// console.log(JSON.stringify(monthDates()));
// console.log();
// let firstDate = monthDates().week4.weekStartDate;
// firstDate.oneDay();
// console.log(JSON.stringify(firstDate.dayStart.toLocaleString()));
// console.log();
// for(let i = 27; i > 0; i--) {
//     updateDate(firstDate, 1).oneDay(); 
//     console.log(`day${i} ${JSON.stringify(firstDate.dayStart.toLocaleString())}`);
//   }


// Given a day give me the end of week day Saturday 11:59:59 and six months ago Sunday 12:00:00
let today = new Date()

// console.log(`starts at: ${weekStarts(today)} and \nEnds at: ${weekEnds(today)}`);
// let t = updateDate(new Date(), -180)
// console.log(t)
// console.log(`starts at: ${weekStarts(t)} and \nEnds at: ${weekEnds(t)}`);

// starting today print the last 30 days 
// starting 12:00:00 am of that day to 11:59:59 of that day
// ex: date: x/x/x start 
let firstDate = monthDates().week4.weekStartDate;
firstDate.oneDay();
console.log(firstDate.dayStart.toISOString())



let dayStart = dayStarts(today)
console.log(dayStart.toISOString())
let dayEnd = dayEnds(today)


for (let i = 0; i<=30; i++) {
    let today = new Date();
    let dayBefore = updateDate(today, -i);
    console.log(dayBefore.toString())
    let dayStart = dayStarts(dayBefore)
    console.log(dayStart.toString())
    let dayEnd = dayEnds(dayBefore)
    console.log(dayEnd.toString())
    console.log(".........................")

}