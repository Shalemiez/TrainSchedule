var firebaseConfig = {
    apiKey: "AIzaSyCWW1hRTERRgC77fIT_8IZfFL-KHZHAw14",
    authDomain: "brew-master-project.firebaseapp.com",
    databaseURL: "https://brew-master-project.firebaseio.com",
    projectId: "brew-master-project",
    storageBucket: "brew-master-project.appspot.com",
    messagingSenderId: "677241453426",
    appId: "1:677241453426:web:1c29a97b4cb0b31783bbeb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database()
//up
$('#submit').on('click', function (e) {
    e.preventDefault();
    var trainName = $('#trainName').val().trim()
    var destination = $('#destination').val().trim()
    var firstTrainTime = $('#firstTrainTime').val().trim()
    var frequency = $('#frequence').val().trim()

    var train = {
        name: trainName,
        dest: destination,
        time: firstTrainTime,
        frequency: frequency,
    }
    console.log(train)
    db.ref().push(train)

})

db.ref().on("child_added", function (snapshot) {

    var thisTrain = snapshot.val()
    console.log(thisTrain)
    var newRow = $('<tr>')
    var newCell = $('<td>')
    newCell.text(thisTrain.name)
    newRow.append(newCell)

    newRow.append($('<td>').text(thisTrain.dest))
    newRow.append($('<td>').text(thisTrain.frequency))
    var now = moment()
    var firstTime = moment(thisTrain.time, "HH:mm")
    console.log(now)
    console.log(firstTime)

    var differenceFirstTrain = now.diff(firstTime, 'minutes')
    console.log(differenceFirstTrain)
    var timeTillNext;
    if (differenceFirstTrain < 0) {
        timeTillNext = Math.abs(differenceFirstTrain)
    } else {

        var timeSinceLast = differenceFirstTrain % thisTrain.frequency
        console.log(timeSinceLast)
        timeTillNext = thisTrain.frequency - timeSinceLast
    }

    console.log(timeTillNext)
    var nextArrival = now.add(timeTillNext, 'minutes');
    newRow.append($('<td>').text(nextArrival.format("h:mm a")))
    newRow.append($('<td>').text(timeTillNext))


    $('tbody').append(newRow)


})



