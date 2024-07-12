function getCurrentDate(){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
return mm+'/'+dd+'/'+yyyy;
}
module.exports.getCurrentDate = getCurrentDate;

function getDayByWeek(date,week,weekDay){
var weekdaynum;
if(weekDay.includes("sunday")){
weekdaynum=7;
}
else if(weekDay.includes("monday")){
weekdaynum=1;
}
else if(weekDay.includes("tuesday")){
weekdaynum=2;
}
else if(weekDay.includes("wednesday")){
weekdaynum=3;
}
else if(weekDay.includes("thursday")){
weekdaynum=4;
}
else if(weekDay.includes("friday")){
weekdaynum=5;
}
else if(weekDay.includes("saturday")){
weekdaynum=6;
}
var dat = new Date(date);
dat.setDate(dat.getDate() + week*7);
var day = dat.getDay();
if (day==0){
day=7;
}
dat.setHours(-24 * (day - weekdaynum));
//return dat.toLocaleDateString();
var month=dat.getMonth()+1;
var  newDay=dat.getDate();
var  year=dat.getFullYear();
return month + '/' + newDay + '/' + year;
}
module.exports.getDayByWeek = getDayByWeek;