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

/* declarations for traffic license */
var drivingLicenseIdTextTL = document.getElementById("dlIdOfUser");
var brandOfVehicleText = document.getElementById("brandOfVehicle");
var modelOfVehicleText = document.getElementById("modelOfVehicle");
var dateOfProductionText = document.getElementById("dateOfProduction");
var VINText = document.getElementById("vehicleIdentificationNumber");
var registrationNumberText = document.getElementById("registrationNumber");
var weightOfVehicleText = document.getElementById("weightOfVehicle");
var categoryOfVehicleText = document.getElementById("categoryOfVehicle");
var selectedVehicle;
var selectedVehicleObject;


/* declarations for checking input fields */
var checkDrivinglicenseIdNumber = document.getElementById("dlIdOfUser");

/* array declarations */
var userArray = [];
var drivingLicArray = [];

var minResultForTest = {
    "drivingTest": 90,
    "trafficEducationTest": 95,
    "firstAidTest": 90
};
var driveableCategory = ["D1 - motorcycle", "D1", "D2", "B2", "U"];
var vehicleArray = [
    {
        "brand": "Mazda",
        "model": "6",
        "dateOfProduct": "2020",
        "dateOfComission": "2020-11-01",
        "vin":"vblewvfv96421",
        "registrationNumber": "sde-432",
        "weight": "1566 kg",
        "category": "B2"
    },
    {
        "brand": "Ford",
        "model": "Mustang",
        "dateOfProduct": "2021",
        "dateOfComission": "2022-01-01",
        "vin":"lwyjvpqh91630",
        "registrationNumber": "svv-835",
        "weight": "1681 kg",
        "category": "B2"
    },

] ;
/* div declarations */
var userInfoDiv = document.getElementById("userInfoContainer");

/* MENU buttons */
var drivingLicenseBtn = document.getElementById("drivingLicenseMenuBtn");
var trafficLicenseBtn = document.getElementById("trafficLicenseMenuBtn");

/* button declarations */
/* button declarations for user registration */
var saveUserBtn = document.getElementById("saveUserRegistrationBtn");
var cancelUserBtn = document.getElementById("cancelUserRegistrationBtn");
/* button declarations for traffic license registration */
var submitDrivingLicenseBtn = document.getElementById("submitDrivingLicenseBtn");
var saveDrivingLicenseBtn = document.getElementById("saveDrivingLicenseBtn");

/* button declarations for traffic license registration */
var submitTrafficLicenseBtn = document.getElementById("submitTrafficLicenseBtn");
var saveTrafficLicenseBtn = document.getElementById("saveTrafficLicenseBtn");
var cancelTrafficLicenseBtn = document.getElementById("cancelTrafficLicenseBtn");

/* list declarations */
var drivingLicenseUserList = document.getElementById("listForDrivingLicense");
var trafficLicenseUserList = document.getElementById("userListForTrafficLicense");
var trafficLicenseVehicleList = document.getElementById("vehicleListForTrafficLicense");

//People object
function People(firstName, lastName, birthDate, gender, id){
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
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
function DrivingLicense (drivLicId, category, firstAidTest, drivingTest, trafficEducation){
    this.drivLicId = drivLicId;
    this.category = category;
    this.firstAidTest = firstAidTest;
    this.drivingTest = drivingTest;
    this.trafficEducationTest = trafficEducation;
    People.apply(this, arguments);
    /* Young.apply(this, arguments); */
    
}

/* prototype for DrivingLicense */
    DrivingLicense.prototype = Object.create(People.prototype);
    DrivingLicense.prototype.constructor = DrivingLicense;

/* date of issue */
DrivingLicense.prototype.dateOfIssue = currentDate();

/* expiration date */
DrivingLicense.prototype.expirationDate = function(){
    //expiration date depending on ageCat 
    return year+4 + "-" + month + "-"+ dt;
}
//Traffic license object
function TrafficLicense(traffLicId){
    this.id = traffLicId;
}
/* prototype of TrafficLicense */
TrafficLicense.prototype = Object.create(People.prototype);
TrafficLicense.prototype.constructor = TrafficLicense;

/* date of issue */
TrafficLicense.prototype.dateOfIssue = currentDate();

/* expiration date */
TrafficLicense.prototype.expirationDate = function(){
    return year + 4 + "-" + month + "-" + dt;
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
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

function Motorcycle(){
    Vehicle.apply(this, arguments);
}
Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;

function Truck(){
    Vehicle.apply(this, arguments);
}
Truck.prototype = Object.create(Vehicle);
Truck.prototype.constructor = Truck;
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
        generateListForUl(userArray, drivingLicenseUserList);
        clickListItem(userArray, drivingLicenseUserList, emptyDrivingLicenseInputFields());
    }
    else{
        generateListForUl(userArray, drivingLicenseUserList);
        clickListItem(userArray, drivingLicenseUserList, emptyDrivingLicenseInputFields());
    }
    
})
/* list of users for generating driving license */
function generateListForUl(array, selectedElement){
    
    console.log("users will be adding to the list");//line for test
    array.forEach(function(val){
        $(selectedElement).append(`<li>${val.fullName()}</li>`);   
    })
    console.log("users added sucessfully");//line for test

    
}
/* click to the selected user for create driving license */
function clickListItem(array, selectedElement, emptyFields){
    console.log("clickUser is invoking now")//line for test
    for (var indxOfUser = 0;  indxOfUser < array.length;  indxOfUser++) {  
        selectedElement.children[indxOfUser].addEventListener("click", function(){            
            if (selectedElement.children.length == -1) { //not sure if it is necessary
                alert("Please add users or load the userlist!");
            }
            else{ 
                emptyFields;
                selectedUser = this.innerHTML;
                console.log(selectedUser);//line for test
            }
        }) 
    }
    console.log("clickuser is finishing");//line for test
}

/* check the user ID number */
submitDrivingLicenseBtn.addEventListener("click", function(){
    console.log("sikeers kattintás");
    checkId(userIdText, userArray);
    loadDrivingLicenseCategory();
})

function checkId(input, array){
    
  for (let i = 0; i < array.length;i++) {
    if(input.value == array[i].id && selectedUser == array[i].fullName()){   //need to corrigate the statement, lowercased or not?
        //true
        //new feature - need to add selectedUserObject
        selectedUserObject = array[i];   
        fullNameTextDL.value = array[i].fullName();
        birthDayDL.value = array[i].birthDate;
        ageTextDL.value = array[i].age();   //need to finish the proto
        ageGroupDL.value= array[i].ageCategory();   
        drivingLicenseIdText.value = generateSpecificId(3,8);
        //toogle with animation
        //userInfoDiv.style.display = "block"
        
        break;
    }
    else if(input.value != array[i].id || selectedUser != array[i].fullName()){
        //false
        alert("Check the user ID or the user, something is wrong!")//Not in a good place, causes error if I no choose the first  line in every loop
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
    /* check the result of the test */
    if (checkTestResults(minResultForTest) == true) {
        //need to add the test results too.
        drivingLic = new DrivingLicense(drivingLicenseIdText.value, drivingLicCategoryList.value, firstAidResult.value, drivingResult.value, TestResult.value, selectedUserObject.id, selectedUserObject.firstName, drivingLicCategoryList.value, selectedUserObject.birthDate, selectedUserObject.gender, selectedUserObject.lastName  );
        drivingLicArray.push(drivingLic);
        emptyDrivingLicenseInputFields();
    };
})

function checkTestResults(arr){
    if (arr.drivingTest > drivingResult.value || arr.trafficEducationTest > TestResult || arr.firstAidTest > firstAidResult.value) {
        alert("The result of the tests are not enough.")
        return false
    }
    return true
}
/* MENU - traffic license */
trafficLicenseBtn.addEventListener("click", function(){
    if (trafficLicenseUserList.children.length != 0) {
        $(trafficLicenseUserList).empty()
        generateListForUl(drivingLicArray, trafficLicenseUserList);
        clickListItem(drivingLicArray, trafficLicenseUserList, emptyTrafficLicenseInputFields);
    }
    else{
        generateListForUl(drivingLicArray, trafficLicenseUserList);
        clickListItem(drivingLicArray, trafficLicenseUserList, emptyTrafficLicenseInputFields);
    }
});

/* empty fields */
function emptyTrafficLicenseInputFields(){
    brandOfVehicleText.value = "";
    modelOfVehicleText.value = "";
    dateOfProductionText.value = "";
    VINText.value = "";
    registrationNumberText.value = "";
    weightOfVehicleText.value = "";
    categoryOfVehicleText.value = "";
}
/* check the Driving License ID number */
submitTrafficLicenseBtn.addEventListener("click", function(){
    console.log("traffic license check click")//line for test
    
    checkDrivingLicenseId(drivingLicenseIdTextTL, drivingLicArray);
    clickVehicle(trafficLicenseVehicleList);
})
/* add values to the fields */
function checkDrivingLicenseId(input, array){
    console.log("check Driving license id begins");//line for test
    for (let indexOfDrivingLicenseUserList = 0; indexOfDrivingLicenseUserList < array.length; indexOfDrivingLicenseUserList++) {
        selectedUserObject = array[indexOfDrivingLicenseUserList] //need to use this line in the statement
        if (input.value == selectedUserObject.drivLicId && selectedUser == array[indexOfDrivingLicenseUserList].fullName()) {
            //filter the Vehicles by the category (Vehicle.category == DrivingLicense.category)
            filterVehicleCategory(vehicleArray, listVehiclesForTrafficLicense);
        }
        
    }
    console.log("check Driving license id finished");//line for test
}

/* driving category and connections */


/* check and filter the Vehicles by the category */
function listVehiclesForTrafficLicense(idOfVehicle){
    console.log("listing vehicle")
    return $(trafficLicenseVehicleList).append(`<li>${idOfVehicle.toUpperCase()}</li>`);
}

function filterVehicleCategory(array, callbackFn){
    console.log("filter invokes")//line for test
    array.filter(function(val){
        let value;
        //condition for the listing
        console.log(val.category)//line for test
        if(val.category == selectedUserObject.category){
            value = val.registrationNumber;
            console.log(value);
            return callbackFn(value);
        }
        
    })
    console.log("filter finished")
}

/* click to the selected Vehicle  */
function clickVehicle(selectedElement){
    for(let indxOfListItem = 0; selectedElement.children.length; indxOfListItem++){
        selectedElement.children[indxOfListItem].addEventListener("click", function(){
            selectedVehicle = this.innerHTML;
            console.log(selectedVehicle);//line for test
            loadVehicleData(vehicleArray);
        })
    }
}

/* load Vehicle data */
function loadVehicleData(array){
    for(let indxOfVehicle = 0; array.length; indxOfVehicle++){
        if (selectedVehicle.toLowerCase() == array[indxOfVehicle].registrationNumber) {
            selectedVehicleObject = array[indxOfVehicle];
            brandOfVehicleText.value = selectedVehicleObject.brand;
            modelOfVehicleText.value = selectedVehicleObject.model;
            dateOfProductionText.value = selectedVehicleObject.dateOfProduct;
            VINText.value = selectedVehicleObject.vin;
            registrationNumberText.value = selectedVehicleObject.registrationNumber;
            weightOfVehicleText.value = selectedVehicleObject.weight;
            categoryOfVehicleText.value = selectedVehicleObject.category;
        }
    }
}

/* save driving license */
saveTrafficLicenseBtn.addEventListener("click", function(){
    
})

/* ready */
$(document).ready(function(){

})/*  */