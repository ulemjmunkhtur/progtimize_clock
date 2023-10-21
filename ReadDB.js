var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function getEvents(){
    MongoClient.connect(url, function(err, db){
        if (err) throw err;
        var dbo = dbo.db("mydb");
        var allEvents = dbo.collection("Events").find({}).toArray(function(err,result){
            if (err) throw err;
            console.log('Fetched Documents');
            db.close();
        });
    });
    return allEvents
}

function createTaskforEvents (Event){
    const taskName = Event.name;
    const startHour = Event.start / 100;
    const startMinute = Event.start % 100;
    const endHour = Event.end / 100;
    const endMinute = Event.end % 100;

    const format = document.getElementById('timeFormat').value;

    const taskElement = document.createElement('div');
    taskElement.className = 'progress-container';

    const taskLabel = document.createElement('h4');
    taskLabel.textContent = taskName;
    taskElement.appendChild(taskLabel);

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';

    const progress = document.createElement('div');
    progress.className = 'progress';
    progressBar.appendChild(progress);

    taskElement.appendChild(progressBar);

    const startTimeElement = document.createElement('span');
    startTimeElement.textContent = getFormattedTime(startHour, startMinute, format);
    const endTimeElement = document.createElement('span');
    endTimeElement.textContent = getFormattedTime(endHour, endMinute, format);

    const timeContainer = document.createElement('div');
    timeContainer.className = 'start-end-time';
    timeContainer.appendChild(startTimeElement);
    timeContainer.appendChild(endTimeElement);
    taskElement.appendChild(timeContainer);

    document.body.insertBefore(taskElement, document.querySelector('.connect-btn'));
}

export{getEvents, createTaskforEvents};
