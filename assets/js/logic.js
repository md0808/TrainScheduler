






// Make sure that your app suits this basic spec:
  
// * When adding trains, administrators should be able to submit the following:
  
//   * Train Name
  
//   * Destination 
  
//   * First Train Time -- in military time
  
//   * Frequency -- in minutes

// * Code this app to calculate when the next train will arrive; this should be relative to the current time.

// * Users from many different machines must be able to view same train times.

// * Styling and theme are completely up to you. Get Creative!

// ### Example Site

// ![train homework](Train_Time_Image.png)

// ### Bonus (Extra Challenges)

// * Consider updating your "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; only attempt this if you've completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).

// * Try adding `update` and `remove` buttons for each train. Let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).

// * As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.
//==================================================================================================



//connect to firebase
var config = {
    apiKey: "AIzaSyBCftYVAoCvMFlOn-B3XLSxK8l91qT3TMs",
    authDomain: "train-scheduler-6bd9b.firebaseapp.com",
    databaseURL: "https://train-scheduler-6bd9b.firebaseio.com",
    projectId: "train-scheduler-6bd9b",
    storageBucket: "",
    messagingSenderId: "669682352808",
    appId: "1:669682352808:web:56f617978a188e92d2789d",
    measurementId: "G-YE5QL7QH00"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

var database = firebase.database;
//Use jQuery to get values from the HTML form on click event of submit button

$('#add-train-btn').on('click', function(event){
    event.preventDefault();

    var trainName= $('#train-name-input').val().trim();
    var destination= $('#destination-input').val().trim();
    var frequency= $('#frequency-input').val().trim();
    var arrival= moment($('#arrival-input').val().trim(), "HH:mm").format("X");
    var weekendsAndHolidays= $("input:radio:checked").val();
    console.log(trainName);
    console.log(destination)
    console.log(frequency);
    console.log(arrival);
    console.log(weekendsAndHolidays);

    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        arrival: arrival,
        weekendsAndHolidays: weekendsAndHolidays,
      };

    database.ref().push(newTrain);
    

      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.frequency);
      console.log(newTrain.arrival);
      console.log(newTrain.weekendsAndHolidays);
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#frequency-input").val("");
      $("#arrival-input").val("");
      $("#arrival-input").val("No");


})



// convert times using moment.js
var currentTime = moment().format("HH:mm");
console.log(currentTime);

// Creates local "temporary" object for holding train data


var addTrain = {

}


//create data object for each train

//convert times into legible format down to minute

//push to firebase
// database.ref().push(newEmp);
//get snapshots of data from firebase

//Append to table



