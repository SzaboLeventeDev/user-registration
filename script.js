/* declarations */
var firstNameText = document.getElementById("firstName");
var lastNameText = document.getElementById("lastName");
var birthDay = document.getElementById("dateOfBirth");
var genderVal = document.getElementById("gender");
var genderMale = document.getElementById("genderMale");
var genderFemale = document.getElementById("genderFemale");
/* button declarations */
var saveUserBtn = document.getElementById("saveUserRegistrationBtn");
var cancelUserbtn = document.getElementById("cancelUserRegistrationBtn");
var userArray = [];
//People object
function People(firstName, lastName, birthDate, /* year, month, day, */ gender, id){
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    /* this.year = year;
    this.month = month;
    this.day = day; */
    this.gender = gender;
    this.id = id;
}
//I am not sure I need this
People.prototype.date = function(){
    return new Date(this.year, this.month, this.day);
}
People.prototype.fullName = function(){
    return this.firstName + " " + this.lastName;
}
People.prototype.age = ""   //need solution, checkAge() causes error here
//student object

function Young(studId){
    People.apply(this, arguments);
    this.studentIdentificationNumber = studId;
}
Young.prototype = Object.create(People.prototype);
Young.prototype.constructor = Young;

//driving license object
function DrivingLicense(){
    People.apply(this, arguments);
    Student.apply(this, arguments);
}

//Vehicle object
function Vehicle(brand, model, dateOfProduct, dateOfCommission, vin, registrationNumber){
    this.brand = brand;
    this.model = model;
    this.dateOfProduct = dateOfProduct;
    this.dateOfCommission = dateOfCommission;
    this.vin = vin;
    this.registrationNumber = registrationNumber;
}

function Car(){
    Vehicle.apply(this, arguments);
    this.category= "test"
}
function Motorcycle(){
    Vehicle.apply(this, arguments);
    this.category = "test2";
}

/* save user */
saveUserBtn.addEventListener("click", function(){
    /* check the age to choose the  matching object*/
    console.log(birthDay.value);//line for test
    var tempAge = checkAge(birthDay);
    let uId = generateUserId();
    if (tempAge >= 18 && userArray.indexOf(Object.id) != uId) {
        console.log(">=18 true");//line for test
        userArray.push(new People(firstNameText.value, lastNameText.value, birthDay.value, checkGender(), uId));
    }
    else if(tempAge  < 18 && tempAge >= 16 && userArray.indexOf(Object.id) != uId){
        console.log(" >= 16 && <18 true");//line for test
        userArray.push(new Young(firstNameText.value, lastNameText.value, birthDay.value, checkGender(), generateUserId()));
    }
    else{
        alert("The person is too young for registrate.")
    }
})



/* check age of the person */
function checkAge(date){
    var currentDate = new Date();
    var cDay = currentDate.getDate();
    var cMonth = currentDate.getMonth() +1;
    var cYear = currentDate.getFullYear();
    var cDate = new Date(cYear, cMonth, cDay);
    

    var personDate = date.value
    var pYear = personDate.substr(0,4);
    var pMonth = personDate.substr(5,2);
    var pDay = personDate.substr(8);
    var pDate = new Date(pYear, pMonth, pDay);

    return new Date(cDate.getTime() - pDate.getTime()).getUTCFullYear()- 1970; //console.log not necessary, just the value
    
}
/* check the gender of the user */
function checkGender(){
    if(genderFemale.checked == true){
        return "female";
    }
    else if(genderMale.checked == true){
        return "male";
    }
}
/* generate ID for users */
function generateRandomString(charNumber){
    let randomString = "";
    let randomAscii;
    for (let index = 0; index < charNumber; index++) {
        randomAscii = Math.floor((Math.random()* 25) + 97);
        randomString += String.fromCharCode(randomAscii);
    }
    return randomString;
    console.log(randomString);
}
function generateRandomNumber(number){
    let num_low = 1;
    let num_high = 9;
    var idNum ="";
    for (let index = 0; index < number; index++) {
        idNum += Math.floor((Math.random() * (num_high - num_low)) + num_low);
    }
    console.log(idNum);
    return idNum;
    
}
function generateUserId() {
    return generateRandomString(5) + generateRandomNumber(5)
}

/* list of users for generating driving license */
function userListForDrivingLicense(){
    userArray.forEach(function(){
        
    })
}