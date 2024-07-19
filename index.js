// helpers.js

// Creates an employee record from an array
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Creates multiple employee records
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }
  
  // Adds a timeIn event to the employee record
  function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10)
    });
    return this;
  }
  
  // Adds a timeOut event to the employee record
  function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10)
    });
    return this;
  }
  
  // Calculates hours worked on a given date
  function hoursWorkedOnDate(date) {
    let timeInEvent = this.timeInEvents.find(e => e.date === date);
    let timeOutEvent = this.timeOutEvents.find(e => e.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  // Calculates wages earned on a given date
  function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
  }
  
  // Aggregates all wages for the employee
  function allWagesFor() {
    let dates = this.timeInEvents.map(e => e.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0);
  }
  
  // Calculates the total payroll for an array of employee records
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor.call(record), 0);
  }
  
  // Finds an employee by their first name
  function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
  }
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll,
    findEmployeeByFirstName
  };
  