/* declarations */
var firstNameTextUR = document.getElementById("firstName");
var lastNameTextUR = document.getElementById("lastName");
var fullNameTextDL = document.getElementById("nameOfDriver");
var birthDay = document.getElementById("dateOfBirth");
var birthDayDL = document.getElementById("dateOfBirthDL");
var genderVal = document.getElementById("gender");
var genderMale = document.getElementById("genderMale");
var genderFemale = document.getElementById("genderFemale");
var userIdText = document.getElementById("idOfUser");
var ageTextDL = document.getElementById("ageOfDriver");
var ageGroupDL = document.getElementById("ageGroup");
var drivingLicCategoryList = document.getElementById("drivingLicenseCategoryList");
var TestResult = document.getElementById("testResult");
var drivingResult = document.getElementById("drivingResult");
var firstAidResult = document.getElementById("firstAidResult");
var drivingLicenseIdText = document.getElementById("drivingLicenseIdNumber");
var selectedUser;
var selectedUserObject;
var year;
var month;
var dt;

/* array declarations */
var userArray = [];
var drivingLicArray = [];
var monthDictionary = { //maybe it is not necessary
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
};
var driveableCategory = ["D1 - motorcycle", "D1", "D2", "B2", "U"]
/* div declarations */
var userInfoDiv = document.getElementById("userInfoContainer");

/* button declarations */
var saveUserBtn = document.getElementById("saveUserRegistrationBtn");
var cancelUserBtn = document.getElementById("cancelUserRegistrationBtn");
var drivingLicenseBtn = document.getElementById("drivingLicenseMenuBtn");
var submitBtn = document.getElementById("submitDrivingLicenseBtn");
var saveDrivingLicenseBtn = document.getElementById("saveDrivingLicenseBtn");
/* list declarations */
var drivingLicenseUserList = document.getElementById("listForDrivingLicense");//I am not sure I need this



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
    this.drivLicId = drivLicId;
    this.category = category;
    People.apply(this, arguments);
    /* Young.apply(this, arguments); */
    
}

/* prototype for DrivingLicense choosing the appropriate inheritance */
if(this.age >= 18){
    console.log("DL proto from People");//line for test
    DrivingLicense.prototype = Object.create(People.prototype);
    DrivingLicense.prototype.constructor = DrivingLicense;
}
else if(this.age <18 && this.age <= 16){
    console.log("DL proto from Young");//line for test
    DrivingLicense.prototype = Object.create(Young.prototype);
    DrivingLicense.prototype.constructor = DrivingLicense;

}

/* date of issue */
DrivingLicense.prototype.dateOfIssue = currentDate();

DrivingLicense.prototype.expirationDate = function(){
    //expiration date depending on ageCat 
    return year+4 + "-" + month + "-"+ dt;
    /* console.log((date+4) + "-" + month +"-" + dt) */
    //under 18 license is valid for 2 years

    //between 18 and 40 is 6 years

    //between 40 and 50 is 4 years

    //between 50 and 60 is  3 years

    //between 60 and 65 is 2 years

    //between 65 and 70 is 1 years with plus conditions if they are true.
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
        user = new People(firstNameTextUR.value, lastNameTextUR.value, birthDay.value, checkGender(), uId)
        userArray.push(user);
        
    }
    else if(tempAge  < 18 && tempAge >= 16 && userArray.indexOf(Object.id) != uId){
        console.log(" >= 16 && <18 true");//line for test
        user = new Young(firstNameTextUR.value, lastNameTextUR.value, birthDay.value, checkGender(), uId)
        userArray.push(user);
        
    }
    else{
        alert("The person is too young for registrate.")
    }
    emptyUserRegistrationField();
})

/* empty the input fields */
function emptyUserRegistrationField(){
    firstNameTextUR.value ="";
    lastNameTextUR.value = "";
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
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();
    
    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    
    return year+'-' + month + '-'+dt;
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
        drivingLicenseUserList.children[indxOfUser].addEventListener("click", function(){            
            if (drivingLicenseUserList.children.length == -1) { //not sure if it is necessary
                alert("Please add users or load the userlist!");
            }
            else{ 
                emptyDrivingLicenseInputFields();
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
    loadDrivingLicenseCategory();
})
function checkUserId(){
    
  for (let i = 0; i < userArray.length;i++) {
    if(userIdText.value == userArray[i].id && selectedUser == userArray[i].fullName()){   //need to corrigate the statement, lowercased or not?
        //true
        //new feature - need to add selectedUserObject
        selectedUserObject = userArray[i];   
        fullNameTextDL.value = userArray[i].fullName();
        birthDayDL.value = userArray[i].birthDate;
        ageTextDL.value = userArray[i].age();   //need to finish the proto
        ageGroupDL.value= userArray[i].ageCategory();   //need to finish the proto
        drivingLicenseIdText.value = generateSpecificId(3,8);
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
/* Load driving license category */
function loadDrivingLicenseCategory(){
    driveableCategory.forEach(function(val){
        $(drivingLicCategoryList).append(`<option>${val}</option>`);
    })
}
/* empty the input fields in driving license menu */
function emptyDrivingLicenseInputFields(){
    userIdText.value = "";
    fullNameTextDL.value = "";
    birthDayDL.value = "";
    ageTextDL.value = "";
    ageGroupDL.value = "";
    TestResult.value = "";
    drivingResult.value = "";
    firstAidResult.value = "";
    drivingLicCategoryList.selectedIndex = "0";
    drivingLicenseIdText.value = "";
}
/* Save the driving license */

saveDrivingLicenseBtn.addEventListener("click", function(){
    let drivingLic;
    drivingLic = new DrivingLicense(drivingLicenseIdText.value, selectedUserObject.id, selectedUserObject.firstName, drivingLicCategoryList.value, selectedUserObject.birthDate, selectedUserObject.gender, selectedUserObject.lastName  );
    drivingLicArray.push(drivingLic)
    emptyDrivingLicenseInputFields();
})

function checkTestResults(){

}
/* ready */
$(document).ready(function(){

})/*  */