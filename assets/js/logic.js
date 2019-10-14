var firebaseConfig = {
  apiKey: "AIzaSyBCftYVAoCvMFlOn-B3XLSxK8l91qT3TMs",
  authDomain: "train-scheduler-6bd9b.firebaseapp.com",
  databaseURL: "https://train-scheduler-6bd9b.firebaseio.com",
  projectId: "train-scheduler-6bd9b",
  storageBucket: "train-scheduler-6bd9b.appspot.com",
  messagingSenderId: "669682352808",
  appId: "1:669682352808:web:56f617978a188e92d2789d",
  measurementId: "G-YE5QL7QH00"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$('#add-train-btn').on('click', function(event){
    event.preventDefault();

    var trainName= $('#train-name-input').val().trim();
    var destination= $('#destination-input').val().trim();
    var frequency= $('#frequency-input').val().trim();
    var arrival= moment($('#arrival-input').val().trim(), "HH:mm").format("HH:mm");
    var weekendsAndHolidays= $("input:radio:checked").val();

    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        arrival: arrival,
        weekendsAndHolidays: weekendsAndHolidays,
      };

    database.ref().push(newTrain);
    

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#frequency-input").val("");
      $("#arrival-input").val("");
      $("#arrival-input").val("No");

})

database.ref().on("child_added", function(childSnapshot) {

 
  var dataTrainName = childSnapshot.val().name;
  var dataDestination = childSnapshot.val().destination;
  var dataFrequency = childSnapshot.val().frequency;
  var dataFirstArrival = childSnapshot.val().arrival;
  var dataWeekends = childSnapshot.val().weekendsAndHolidays;


  var dataFirstArrivalConverted = moment(dataFirstArrival, "HH:mm", true).subtract(1, "years");
  var diffTime = moment().diff(moment(dataFirstArrivalConverted), "minutes");
  var tRemainder = diffTime % dataFrequency;
  var tMinutesTillTrain = dataFrequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextArrival = moment(nextTrain).format("hh:mm");


  var newTableRow = $('<tr>')
  var newTDName = $('<td>'+ dataTrainName + '</td>');
  var newTDDestination = $('<td>'+ dataDestination + '</td>');
  var newTDFrequency = $('<td>'+ dataFrequency+ '</td>');
  var newTDArrival = $('<td>'+ nextArrival + '</td>');
  var newTDMinutesAway = $('<td>'+ tMinutesTillTrain + '</td>');
  var newTDWeekends= $('<td>'+ dataWeekends + '</td>');


  $('#train-table-body').append(newTableRow);
  newTableRow.append(newTDName);
  newTableRow.append(newTDDestination);
  newTableRow.append(newTDFrequency);
  newTableRow.append(newTDArrival);
  newTableRow.append(newTDMinutesAway);
  newTableRow.append(newTDWeekends);    
});




// * Users from many different machines must be able to view same train times.

// ### Bonus (Extra Challenges)

// * Consider updating your "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; only attempt this if you've completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).

// * Try adding `update` and `remove` buttons for each train. Let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).

// * As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.
//==================================================================================================



