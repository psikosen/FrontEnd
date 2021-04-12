$(document).ready(function () {
  /**
   * Gets an object and sets its content into the result card in the result page
   * If there's no content in the JSON object, makes sure to tell the user
   */
  if (window.localStorage) {
    if (localStorage.userObject) {
      var user_object = localStorage.getItem('userObject');
      var testVar;
      retreivedObject = JSON.parse(user_object); //parses the retrieved object into an JSON object
      if (JSON.stringify(retreivedObject) == "[]") {
        $('#result-count').text(retreivedObject.length + " Results");
        $(".result-desc").text(
          "Try starting a new search below"
        );
      } else {
		  // get count of objec just in case their are multiple users with the same number or name
        document.getElementById('result-count').innerHTML =   "Result Retrieved"; 
         document.getElementById("result-subtext").innerHTML = "Look at the result below to see the details of the person you’re searched for.";

         $(".name").append(
          retreivedObject.first_name + " " + retreivedObject.last_name
        );
        $('.user-description').append(retreivedObject.description);  
        document.getElementById("address").innerHTML = "<p>" + retreivedObject.address + '</p>';
       
        $(".email").append("<p>" + retreivedObject.email + "</p>");


        for (const phone_number in retreivedObject.phone_numbers) {
          phone = retreivedObject.phone_numbers[phone_number]
          formatted_phone = "(" + phone.substring(0, 3) + ") " + phone.substring(3, 6) + "-" + phone.substring(6, 10);

          $(".phone-num").append(
            "<a href=" + `tel:${phone}` + " style='display: block;color: #004A80;'>" + `${formatted_phone}` + "</a>"
          );
        }

        for (const relative in retreivedObject.relatives) {
          $(".relatives").append(
            "<p style='margin-bottom: 0'>" + `${retreivedObject.relatives[relative]}` + "</p>"
          );
        }

        $(".result-wrap").show();
      }
    }
  }
});
