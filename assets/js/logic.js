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



//click events =============================================================================

$(document).on('click','.remove-btn', function (){

  //This only works locally
  $(this).parent().remove();

  //The key that is generated from database.ref().push().getKey(); doesn't return the 
  //same ID as what shows in the database

  var databaseName = "train-scheduler-6bd9b";
  //data key assigned at line 101
  var trainID = $(this).parent().data('key');

  var path = database.ref(databaseName).child(trainID);
  path.remove();

  }); 

//Create an object out of variables and sends to firebase
$('#add-train-btn').on('click', function(event){
    event.preventDefault();

    var trainName= $("#train-name-input").val().trim();
    var destination= $("#destination-input").val().trim();
    var frequency= $("#frequency-input").val().trim();
    var arrival= moment($("#arrival-input").val().trim(), "HH:mm").format("HH:mm");
    var weekendsAndHolidays= $("input:radio:checked").val();

    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        arrival: arrival,
        weekendsAndHolidays: weekendsAndHolidays,
      };

    database.ref().push(newTrain);
    var key = database.ref().push().getKey();
    console.log(key);      

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#frequency-input").val("");
      $("#arrival-input").val("");
      $("#holiday-input").val("No");

})


//Event listener that brings back a snapshot of what the database looks like when a Child is added ==============================================================

database.ref().on("child_added", function(childSnapshot) {
  
  var trainRef = database.ref().push().getKey(); 
 

  var dataTrainName = childSnapshot.val().name;
  var dataDestination = childSnapshot.val().destination;
  var dataFrequency = childSnapshot.val().frequency;
  var dataFirstArrival = childSnapshot.val().arrival;
  var dataWeekends = childSnapshot.val().weekendsAndHolidays;


  var dataFirstArrivalConverted = moment(dataFirstArrival, "HH:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(dataFirstArrivalConverted), "minutes");
  var tRemainder = diffTime % dataFrequency;
  var tMinutesTillTrain = dataFrequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextArrival = moment(nextTrain).format("HH:mm");


  var newTableRow = $('<tr id= "row-' + trainRef + '">')
  var removeButton = $('<button class="remove-btn">' + "Remove" + '</button>');
  var newTDName = $('<td>'+ dataTrainName + '</td>');
  var newTDDestination = $('<td>'+ dataDestination + '</td>');
  var newTDFrequency = $('<td>'+ dataFrequency+ " minutes" +'</td>');
  var newTDArrival = $('<td>'+ nextArrival + '</td>');
  var newTDMinutesAway = $('<td>'+ tMinutesTillTrain + " minutes away" +'</td>');
  var newTDWeekends= $('<td>'+ dataWeekends + '</td>');


  $("#train-table-body").append(newTableRow);
  //assigns the key as a data attribute (the key) to the whole row
  newTableRow.attr("data-key", trainRef);
  newTableRow.append(removeButton);
  newTableRow.append(newTDName);
  newTableRow.append(newTDDestination);
  newTableRow.append(newTDFrequency);
  newTableRow.append(newTDArrival);
  newTableRow.append(newTDMinutesAway);
  newTableRow.append(newTDWeekends);    
});


// clears and reloads data 
function updateTime(){
  $("#train-table-body").empty();

  database.ref().on("child_added", function(childSnapshot) {
  
    var trainRef = database.ref().push().getKey(); 

    var dataTrainName = childSnapshot.val().name;
    var dataDestination = childSnapshot.val().destination;
    var dataFrequency = childSnapshot.val().frequency;
    var dataFirstArrival = childSnapshot.val().arrival;
    var dataWeekends = childSnapshot.val().weekendsAndHolidays;
  
  
    var dataFirstArrivalConverted = moment(dataFirstArrival, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(dataFirstArrivalConverted), "minutes");
    var tRemainder = diffTime % dataFrequency;
    var tMinutesTillTrain = dataFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextArrival = moment(nextTrain).format("HH:mm");
  
  
    var newTableRow = $('<tr id= "row-' + trainRef + '">')
    var removeButton = $('<button class="remove-btn">' + "Remove" + '</button>');
    var newTDName = $('<td>'+ dataTrainName + '</td>');
    var newTDDestination = $('<td>'+ dataDestination + '</td>');
    var newTDFrequency = $('<td>'+ dataFrequency+ " minutes" +'</td>');
    var newTDArrival = $('<td>'+ nextArrival + '</td>');
    var newTDMinutesAway = $('<td>'+ tMinutesTillTrain + " minutes away" +'</td>');
    var newTDWeekends= $('<td>'+ dataWeekends + '</td>');
  
  
    $("#train-table-body").append(newTableRow);
    newTableRow.attr("data-key", trainRef);
    newTableRow.append(removeButton);
    newTableRow.append(newTDName);
    newTableRow.append(newTDDestination);
    newTableRow.append(newTDFrequency);
    newTableRow.append(newTDArrival);
    newTableRow.append(newTDMinutesAway);
    newTableRow.append(newTDWeekends);  

  });  

}
setInterval(updateTime, 60000);

