 //*************************************************************************
// Function Name: handle key press
// Description: Query for email or user name 
//***********************************************************************/
$(document).ready(function () { 
 //*************************************************************************
//  A few flaws in doing it this way, but it's pretty quick, if it's just a switch
// between two, but it's pretty quick to appen html
//
//***********************************************************************/ 
  $("#emlBtn").on("click", function(e){ 
	  $(this).attr("class","searchBtnSelected bubble"); 
	  $("#phoneNmBtn").attr("class","searchBtnUnselected"); 
	  var typeOfSearch = '<input id="typeOfSearchip" class="form-control" type="text" name="email" placeholder="Enter an Email Address" />'+
     '<p class="error-msg">Please enter a valid email address</p>' + 
    '<button id="btn-search" onclick ="querySearchTerm(); return false;" class="btn btn-form-submit text-uppercase" data-valinput="email" type="submit">Go!</button>'; 
	  resetbtnValues(typeOfSearch); 

  });

  $("#phoneNmBtn").on("click", function(e){ 
	  $(this).attr("class","searchBtnSelected bubble");  
	  $("#emlBtn").attr("class","searchBtnUnselected"); 
	  var typeOfSearch = '<input id="typeOfSearchip" class="form-control" type="text" name="number" placeholder="Enter a Phone Number" />'+
     '<p class="error-msg">Please enter a valid phone number</p>' + 
    '<button id="btn-search" class="btn btn-form-submit text-uppercase"  data-valinput="phoneNum" onclick ="querySearchTerm(); return false;" type="submit" >Go!</button>';
	  
	  resetbtnValues(typeOfSearch); 
  });
  

  $('#btn-search').keypress(function (event) { 
    keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      querySearchTerm();
	}
  });
});

//*************************************************************************
// Event Listener Utility
// Description: Focus to search bar
//***********************************************************************/
if(document.getElementById('searchIconbtn') !== null)
document.getElementById('searchIconbtn').addEventListener("click", function(){
	var searchIcon = document.getElementsByClassName('searchIcon');
	document.getElementById('typeOfSearchip').focus({preventScroll:false}); 
});
 
//*************************************************************************
// Function Name: querySearchTerm
// Description: Query for email or user name 
//***********************************************************************/
function querySearchTerm(){ 
		localStorage.clear(); //Clears storage for next request
		// get data from html value,
		var inputValue = document.getElementById('btn-search').dataset.valinput; 
		console.log(inputValue);
		
		if(inputValue == "email"){ 
			var email = $('input[type="text"]').val().toLowerCase();
			searchEmail(email)
			return true;
		}else{
            var phone = $('input[type="text"]').val().toLowerCase();
			validatePhoneNumber(phone)
			return true;
		}
		return false;
		
  }

//*************************************************************************
// Function Name: resetbtnValues
// Description: Reset button values to default state
//***********************************************************************/  
function resetbtnValues(typeOfSearch){
	  document.querySelector('input[type="text"]').parentNode.classList.remove("error");
	  $("#typeOfSearch").empty(); 
	  // inner html is much faster than append
	  document.getElementById("typeOfSearch").innerHTML  = typeOfSearch; 
} 
//*************************************************************************
// Function Name: validateEmail
// Description: Valdate more complext email
//***********************************************************************/
function validateEmail(email) {
	if(email === null) return false;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//*************************************************************************
// Function Name: testvalidateEmail
// Description: Valdate more complext email
//***********************************************************************/
function testvalidateEmail(email) {
     validateEmail('Raymondgonzalez22@gmail.com');
	 validateEmail("doesmith@example.com"); 
	 validateEmail(null);
	 validateEmail(1); 
}
 
//*************************************************************************
// Function Name: searchEmail
// Description:validate user entered email
//***********************************************************************/  
  function searchEmail(email){
   var x; 
    if (validateEmail(email)) {
      x = true;
    } else {
      x = false;
    }
    callHerokuApi(x,"email=", email); 
  }
//*************************************************************************
// Function Name: testEmailSearch
// Description: TEST:  - validate user entered email
//***********************************************************************/  
  function testEmailSearch(){
     searchEmail('Raymondgonzalez22@gmail.com'); // invalid
	 searchEmail("doesmith@example.com"); // valid entry
	 searchEmail(null); // invalid entry
	 searchEmail(1);  // invalid entry
  } 

//*************************************************************************
// Function Name: validatePhoneNumber
// Description:Validate user's entered phone number
//***********************************************************************/  
  function validatePhoneNumber(phonenumber){
     var x;
    regEx = /[0-9]{10}/;
    if (phonenumber.match(regEx)) {
      x = true;
    } else {
      x = false;
    } 
    callHerokuApi(x,"phone=", phonenumber);   
  } 
//*************************************************************************
// Function Name: testPhoneNumberSearch
// Description: TEST: validate user entered email
//***********************************************************************/  
 function testPhoneNumberSearch(){
     validatePhoneNumber("3832720339"); // invalid entry
	 validatePhoneNumber("2125551235"); // valid entry
	 validatePhoneNumber(null); // invalid entry
	 validatePhoneNumber(1312);  // invalid entry
  }

//*************************************************************************
// Function Name: callHerokuApi
// Description: Api call to database - fetch phone number or user name
//***********************************************************************/  
  function callHerokuApi(x, type,  value){
    if (x === true) {
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
      const proxyurl = "";
	  // custom values in case we need to add additional api calls to database
	  if(type.length > 5 && value.length > 0){
		const url =
			'https://ltv-data-api.herokuapp.com/api/v1/records.json?' + type + value;
		fetch(proxyurl + url)
			.then((response) => response.text())
			.then(function (contents) {
			/* If there's a response, it gets stored in the local storage and redirects to results page*/
			localStorage.setItem("userObject", contents);
			window.location.href = "loading.html";
			})
			.catch((e) => console.log(e));
	  }else{
		  alert("entered value isn't valid");
	  } 
    } else if (x !== true) {
      document.querySelector('input[type="text"]').parentNode.classList.add("error");
    } 
  }

//*************************************************************************
// Function Name: testcallHerokuApi
// Description: TEST: call to database query
//***********************************************************************/  
 function testcallHerokuApi(){
     callHerokuApi(true,"email=", 'Raymondgonzalez22'); // invalid entry
	 callHerokuApi(false,"email=", 'doesmith@example.com'); // valid entry
	 callHerokuApi(null,"phone=", '2123213123123'); // invalid entry
	 callHerokuApi(true,"phone=", "2125551235");  // valid entry
  }