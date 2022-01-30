/* declarations */
var firstNameText = document.getElementById("firstName");
var lastNameText = document.getElementById("lastName");
var fullNameText = document.getElementById("nameOfDriver");
var birthDay = document.getElementById("dateOfBirth");
var birthDayDL = document.getElementById("dateOfBirthDL");
var genderVal = document.getElementById("gender");
var genderMale = document.getElementById("genderMale");
var genderFemale = document.getElementById("genderFemale");
var userIdText = document.getElementById("idOfUser");
var ageText = document.getElementById("ageOfDriver");
var ageGroup = document.getElementById("ageGroup");
var selectedUser;

/* array declarations */
var monthDictionary = [{
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12"
}
/* div declarations */
var userInfoDiv = document.getElementById("userInfoContainer");

/* button declarations */
var saveUserBtn = document.getElementById("saveUserRegistrationBtn");
var cancelUserBtn = document.getElementById("cancelUserRegistrationBtn");
var drivingLicenseBtn = document.getElementById("drivingLicenseMenuBtn");
var submitBtn = document.getElementById("submitDrivingLicenseBtn");

/* list declarations */
var drivingLicenseUserList = document.getElementById("listForDrivingLicense");//I am not sure I need this


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
People.prototype.age = function(){
    console.log("proto.age invokes")// line for test
    if(birthDay.value != ""){
        return checkAge(this.birthDate); //need to add date for param in this format yyyy-mm-dd
    }
} 
People.prototype.ageCategory = function(){
    console.log("proto.ageCategory invokes")// line for test
    if(checkAge(birthDay) >= 18){
        return "adult";
    }
    else if(checkAge(birthDay < 18 && checkAge(birthDay) >= 16)){
        return "young";
    }
}
//Young object

function Young(studId){
    People.apply(this, arguments);
    this.studentIdentificationNumber = studId;
}
Young.prototype = Object.create(People.prototype);
Young.prototype.constructor = Young;

//driving license object
function DrivingLicense (drivLicId, category){
    People.apply(this, arguments);
    Young.apply(this, arguments);
    this.drivLicId = drivLicId;
    this.category = category;
}
/* date of issue */
DrivingLicense.prototype.dateOfIssue = currentDate();

DrivingLicense.prototype.expirationDate = function(){
    //expiration date depending on ageCat 
}

//Vehicle object
function Vehicle(brand, model, dateOfProduct, dateOfCommission, vin, registrationNumber, weight, category){
    this.brand = brand;
    this.model = model;
    this.dateOfProduct = dateOfProduct;
    this.dateOfCommission = dateOfCommission;
    this.vin = vin;
    this.registrationNumber = registrationNumber;
    this.weight = weight;
    this.category = category;
}

/* inherited object types */
function Car(){
    Vehicle.apply(this, arguments);
}
function Motorcycle(){
    Vehicle.apply(this, arguments);
}
function Truck(category){
    Vehicle.apply(this, arguments);
}

/* save user */
saveUserBtn.addEventListener("click", function(){
    /* check the age to choose the  matching object*/
    console.log(birthDay.value);//line for test
    var tempAge = checkAge(birthDay);
    let uId = generateSpecificId(5,5);
    let user;
    if (tempAge >= 18 && userArray.indexOf(Object.id) != uId) {
        console.log(">=18 true");//line for test
        user = new People(firstNameText.value, lastNameText.value, birthDay.value, checkGender(), uId)
        userArray.push(user);
        
    }
    else if(tempAge  < 18 && tempAge >= 16 && userArray.indexOf(Object.id) != uId){
        console.log(" >= 16 && <18 true");//line for test
        user = new Young(firstNameText.value, lastNameText.value, birthDay.value, checkGender(), uId)
        userArray.push(user);
        
    }
    else{
        alert("The person is too young for registrate.")
    }
    emptyUserRegistrationField();
})

/* empty the input fields */
function emptyUserRegistrationField(){
    firstNameText.value ="";
    lastNameText.value = "";
    birthDay.value = "";
}
/* check age of the person */
function checkAge(date){
    var currentDate = new Date();
    var cDay = currentDate.getDate();
    var cMonth = currentDate.getMonth() +1;
    var cYear = currentDate.getFullYear();
    var cDate = new Date(cYear, cMonth, cDay);
    

    var personDate = date.value;
    var pYear = personDate.substr(0,4);
    var pMonth = personDate.substr(5,2);
    var pDay = personDate.substr(8);
    var pDate = new Date(pYear, pMonth, pDay);

    return new Date(cDate.getTime() - pDate.getTime()).getUTCFullYear()- 1970; 
    
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
function generateSpecificId(stCharNumber, numCharNumber) {
    return generateRandomString(stCharNumber) + generateRandomNumber(numCharNumber)
}

/* add back the current date */
function currentDate(){
    let date = new Date();
    let year;
    let month;
    let day;
    
    console.log(date);
    /* for (let indexOfSpace = 0; indexOfSpace < array.length; indexOfSpace++) {
        
        
    } */
    
}
/* MENU - driving license */
drivingLicenseBtn.addEventListener("click", function(){
    //check if the ul has children element or not
    if(drivingLicenseUserList.children.length != 0){
        $(drivingLicenseUserList).empty();
        userListForDrivingLicense();
        clickUser();
    }
    else{
        userListForDrivingLicense();
        clickUser();
    }
    
})
/* list of users for generating driving license */
function userListForDrivingLicense(){
    console.log("users will be adding to the list");//line for test
    userArray.forEach(function(val){
        $("ul").append(`<li>${val.fullName()}</li>`);   
    })
    console.log("users added sucessfully");//line for test

    
}
/* click to the selected user for create driving license */
function clickUser(){
    console.log("clickUser is invoking now")//line for test
    for (var indxOfUser = 0;  indxOfUser < userArray.length;  indxOfUser++) { 
        /* console.log(indxOfUser);//line for test    */  
        drivingLicenseUserList.children[indxOfUser].addEventListener("click", function(){
            console.log("this.innerHTML" + indxOfUser);//line for test
            if (drivingLicenseUserList.children.length == -1) { //not sure if it is necessary
                alert("Please add users or load the userlist!");
            }
            else{ 
                selectedUser = this.innerHTML;
                console.log(selectedUser);//line for test
            }
        }) 
    }
    console.log("clickuser is finishing");//line for test
}

/* check the user ID number */
submitBtn.addEventListener("click", function(){
    console.log("sikeers kattintás");
    checkUserId();
})
function checkUserId(){
    
  for (let i = 0; i < userArray.length;i++) {
    if(userIdText.value == userArray[i].id && selectedUser == userArray[i].fullName()){   //need to corrigate the statement, lowercased or not?
        //true
        fullNameText.value = userArray[i].fullName();
        birthDayDL.value = userArray[i].birthDate;
        ageText.value = userArray[i].age();   //need to finish the proto
        ageGroup.value= userArray[i].ageCategory();   //need to finish the proto
        //toogle with animation
        //userInfoDiv.style.display = "block"
        //change the value of submit 
        submitBtn.setAttribute("value", "Save");
        break;
    }
    else{
        //false
        alert("Check the user ID or the user, something is wrong!")
    } 
      
  }
      
}

/* Save the driving license */

submitBtn.addEventListener("click", function(){
    let drivingLic;
    drivingLic = new DrivingLicense(generateSpecificId(3,8), "category", this.firstName, this.lastName, this.id);
    drivingLicArray.push(drivingLic);
})
/* ready */
$(document).ready(function(){

})