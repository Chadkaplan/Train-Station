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

$("#add-train").on("click", function (event) {
    event.preventDefault();
    trainName = $("#train-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    trainFrequency = $("#frequency-input").val().trim();
    // firstTrain = $("#time-input").val().trim(); Something wrong here

    // Log to check we're reading the values from the form.
    console.log(trainName);

    // Push info to the database
    database.ref().push({
        dbtrainName: trainName,
        dbtrainDestination: trainDestination,
        dbtrainFrequency: trainFrequency,
        // dbfirstTrain: firstTrain,
    })
    alert("Train added!");

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#time-input").val("");


    

// Create on click event to capture form values and add trains to the database
})

// Create Firebase event to retrive trains from the database and a table row in the html when a user adds an entry.

database.ref().on("child_added", function (snap) {
    // Console log data to make sure it is retrieving from the database
    console.log(snap.val());
    // Store all results in variables

    var tName = snap.val().dbtrainName;
    var tDestination = snap.val().dbtrainDestination;
    var tFrequency = snap.val().dbtrainFrequency;
    // var tFirstTrain = snap.val().dbfirstTrain;

    // Next Arrival and Minutes Away Calculations Here

    var tr = $("<tr>")

    // Display results
    tr.append(
        "<td>" + tName + "</td>",
        "<td>" + tDestination + "</td>",
        "<td>" + tFrequency + "</td>",
        "<td>" + "To Be Calculated" + "</td>",
        "<td>" + "To Be Calculated" + "</td>"

    )

    $("#table-results").append(tr)
    // Create variable to hold table elements and content

    // Append all table data (td) to the table row (tr)
})