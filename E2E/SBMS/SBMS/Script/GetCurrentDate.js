function getCurrentDate(){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
return mm+'/'+dd+'/'+yyyy;
}
module.exports.getCurrentDate = getCurrentDate;