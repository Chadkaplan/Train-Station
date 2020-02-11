var firebaseConfig = {
  apiKey: "AIzaSyCx_O4y_Po09SMWSgdXyh7_0oy5qLRT4ys",
  authDomain: "trainstation-53350.firebaseapp.com",
  databaseURL: "https://trainstation-53350.firebaseio.com",
  projectId: "trainstation-53350",
  storageBucket: "",
  messagingSenderId: "885929863474",
  appId: "1:885929863474:web:c3b66b4e4f7c9fc6ab8f2b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Database Reference
var database = firebase.database();

// Global variables
var trainName;
var trainDestination;
var trainFrequency;
var firstTrain;
var trainNextArrival;
var trainMinutesAway;

// Populate Firebase with initial Data.

// Create an on click event to capture form values (trim white space) and add trains to the database.
$(document).ready(function() {
   
  $("#add-train").on("click", function (event) {
    event.preventDefault();
    trainName = $("#train-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    trainFrequency = $("#frequency-input").val().trim();
    firstTrain = $("#time-input").val().trim();
    
    // Log to check we're reading the values from the form.
    console.log(trainName);
    
    // Push info to the database
    database.ref().push({
      dbtrainName: trainName,
      dbtrainDestination: trainDestination,
      dbtrainFrequency: trainFrequency,
    dbfirstTrain: firstTrain,
  })
  alert("Train added!");
  
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#time-input").val("");
  
})

// Create Firebase event to retrive trains from the database and a table row in the html when a user adds an entry.

database.ref().on("child_added", function (snap) {
  
  // Console log data to make sure it is retrieving from the database
  console.log(snap.val());
  
  // Store the results in variables
  var tName = snap.val().dbtrainName;
  var tDestination = snap.val().dbtrainDestination;
  var tFrequency = snap.val().dbtrainFrequency;
  var tfirstTrain = snap.val().dbfirstTrain;
  
  // Next Arrival and Minutes Away Calculations Here
  
  // The first time pushed back to a prior date by 1 year
  var firstTimeConverted = moment(tfirstTrain, "hh:mm A").subtract(1, "years");
  console.log(firstTimeConverted.format("hh:mm A") + " " + tfirstTrain);

  // Current moment
  var currentMoment = moment();
  console.log("CURRENT TIME: " + currentMoment.format("hh:mm A"));
  
  // Current time vs the first train time difference
  var diffTime = currentMoment.diff(firstTimeConverted, "minutes");
  
  // Get the remainder using modulus
  var tRemainder = diffTime % tFrequency;
  
  // Minutes Until Next Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  
  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  
  // Check our calculation is working
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm A"));
  
  
  
  
  
  
  // Display results
  // Create variable to hold table elements and content
  var tr = $("<tr>")
  
  tr.append(
    "<td>" + tName + "</td>",
    "<td>" + tDestination + "</td>",
    "<td>" + moment(nextTrain).format("hh:mm A") + "</td>",
    "<td>" + tFrequency + "</td>",
    "<td>" + tMinutesTillTrain + "</td>"
    
    
    )
    
    $("#table-results").append(tr)
    
    
    // Append all table data (td) to the table row (tr)
  })
});