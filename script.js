//People object
function People(firstName, lastName, year, month, day, gender){
    this.firstName = firstName;
    this.lastName = lastName;
    this.year = year;
    this.month = month;
    this.day = day;
    this.gender = gender;
}
People.prototype.date = function(){
    return new Date(this.year, this.month, this.day);
}
People.prototype.fullName = function(){
    return this.firstName + " " + this.lastName;
}
People.prototype.age = function(){
    
}
//student object

function Young(studId){
    People.apply(this, arguments);
    this.studentIdentificationNumber = studId;
}
Young.prototype = Object.create(People);
Young.prototype.constructor = Young;

//driving license object
function DrivingLicense(){
    People.apply(this, arguments);
    Student.apply(this, arguments);
}

//Vehicle object
function Vehicle(brand, model, dateOfProduct, dateOfCommission){
    this.brand = brand;
    this.model = model;
    this.dateOfProduct = dateOfProduct;
    this.dateOfCommission = dateOfCommission;
}

function Car(){
    Vehicle.apply(this, arguments);
    this.category= "test"
}
function Motorcycle(){
    Vehicle.apply(this, arguments);
    this.category = "test2";
}
