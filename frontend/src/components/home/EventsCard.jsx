// import { Link } from 'react-router-dom';
// import { PiBookOpenTextLight } from 'react-icons/pi';
// import { BiUserCircle } from 'react-icons/bi';
// import { AiOutlineEdit } from 'react-icons/ai';
// import { BsInfoCircle } from 'react-icons/bs';
// import { MdOutlineDelete } from 'react-icons/md';
// import EventSingleCard from './EventSingleCard';

// function addTask() {
//   const taskName = document.getElementById('taskName').value || 'Unnamed Task';
//     const startHour = parseInt(document.getElementById('startHour').value);
//     const startMinute = parseInt(document.getElementById('startMinute').value);
//     const endHour = parseInt(document.getElementById('endHour').value);
//     const endMinute = parseInt(document.getElementById('endMinute').value);

//     const taskElement = document.createElement('div');
//     taskElement.className = 'progress-container';

//     const taskLabel = document.createElement('h4');
//     taskLabel.textContent = taskName;
//     taskElement.appendChild(taskLabel);

//     const progressBar = document.createElement('div');
//     progressBar.className = 'progress-bar';

//     const progress = document.createElement('div');
//     progress.className = 'progress';
//     progressBar.appendChild(progress);
//     taskElement.appendChild(progressBar);

//     const startTimeElement = document.createElement('span');
//     startTimeElement.textContent = getFormattedTime(startHour, startMinute, 0);

//     const endTimeElement = document.createElement('span');
//     endTimeElement.textContent = getFormattedTime(endHour, endMinute, 0);

//     const timeContainer = document.createElement('div');
//     timeContainer.className = 'start-end-time';
//     timeContainer.appendChild(startTimeElement);
//     timeContainer.appendChild(endTimeElement);

//     taskElement.appendChild(timeContainer);

//     document.body.appendChild(taskElement);
// }

// function connectGoogleCalendar(){
//   null;
// }

// const EventsCard = ({ events }) => {
//   return (
//     // <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
//     //   {events.map((item) => (
//     //     <EventSingleCard key={item._id} event={item} />
//     //   ))}
// <div>
//   <head>
//         <meta charSet="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>PROGTIMIZE</title>
//         <link rel="stylesheet" href="index.css" />
//     </head>
//     <body>
//     <h2>PROGTIMIZE</h2>
//     <p style={{ fontStyle: 'italic', marginTop: 0, marginBottom: '25px' }}>
//       Reinventing The Clock
//     </p>
//     </body>
//     <div className="time-display" id="currentTime">
//           00:00:00
//     </div>

//     <div className="custom-time">
//           Task Name: <input type="text" id="taskName" />
//           Start: <select id="startHour"></select>:<select id="startMinute"></select>
//           End: <select id="endHour"></select>:<select id="endMinute"></select>
//           <button className="add-task" onClick={addTask}>
//             Add Task
//           </button>
//     </div>

//     <div className="progress-container">
//           <div className="progress-bar" id="mainProgressBar">
//             <div className="progress" id="dayProgress"></div>
//           </div>
//           <div className="start-end-time">
//             <span>00:00:00</span>
//             <span>23:59:59</span>
//           </div>
//         </div>

//         <button className="connect-btn" onClick={connectGoogleCalendar}>
//           Connect to Google Calendar
//         </button>

//         <script src="Scripts.js"></script>

//     </div>
//   );
// };

// export default EventsCard;

import React, { useEffect } from 'react';

function getFormattedTime(hour, minute, second) {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
}

function updateProgressBar() {
  const now = new Date();

  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const totalSecondsInDay = (endOfDay - startOfDay) / 1000;
  const elapsedSecondsToday = (now - startOfDay) / 1000;

  const progressPercentage = (elapsedSecondsToday / totalSecondsInDay) * 100;

  // Use React state and refs to update the progress bar and currentTime
  document.getElementById('dayProgress').style.width = progressPercentage + '%';

  const currentTime = document.getElementById('currentTime');
  currentTime.textContent = getFormattedTime(now.getHours(), now.getMinutes(), now.getSeconds());

  // Task progress update
  document.querySelectorAll('.progress-container:not(:first-child)').forEach(taskElement => {
    const [startElement, endElement] = taskElement.querySelectorAll('.start-end-time span');
    const startParts = startElement.textContent.split(':').map(e => parseInt(e));
    const endParts = endElement.textContent.split(':').map(e => parseInt(e));

    const startOfTask = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...startParts);
    const endOfTask = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...endParts);
    const taskDuration = (endOfTask - startOfTask) / 1000;
    const elapsedTaskTime = Math.max(0, (now - startOfTask) / 1000);
    const taskProgressPercentage = (elapsedTaskTime / taskDuration) * 100;

    const progressElement = taskElement.querySelector('.progress');
    progressElement.style.width = taskProgressPercentage + '%';

    // Check if the task is unfinished (red) or finished (green)
    if (taskProgressPercentage >= 100) {
      progressElement.style.backgroundColor = '#649865'; // Finished tasks are green
    } else {
      progressElement.style.backgroundColor = '#b64747'; // Unfinished tasks are red
    }
  });
}

function populateDropdowns() {
  const hourDropdowns = [document.getElementById('startHour'), document.getElementById('endHour')];
  const minuteDropdowns = [document.getElementById('startMinute'), document.getElementById('endMinute')];

  for (let i = 0; i <= 23; i++) {
    hourDropdowns.forEach(dropdown => {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = String(i).padStart(2, '0');
      dropdown.appendChild(option);
    });
  }

  for (let i = 0; i <= 59; i++) {
    minuteDropdowns.forEach(dropdown => {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = String(i).padStart(2, '0');
      dropdown.appendChild(option);
    });
  }
}

function addTask() {
  // Your logic for adding a task here
  const taskName = document.getElementById('taskName').value || 'Unnamed Task';
    const startHour = parseInt(document.getElementById('startHour').value);
    const startMinute = parseInt(document.getElementById('startMinute').value);
    const endHour = parseInt(document.getElementById('endHour').value);
    const endMinute = parseInt(document.getElementById('endMinute').value);

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
    startTimeElement.textContent = getFormattedTime(startHour, startMinute, 0);

    const endTimeElement = document.createElement('span');
    endTimeElement.textContent = getFormattedTime(endHour, endMinute, 0);

    const timeContainer = document.createElement('div');
    timeContainer.className = 'start-end-time';
    timeContainer.appendChild(startTimeElement);
    timeContainer.appendChild(endTimeElement);

    taskElement.appendChild(timeContainer);

    document.body.appendChild(taskElement);
}

function createTaskFromGoogle(item){
      const taskName = item.name;
      const startHour = item.start / 100;
      const startMinute = item.start % 100;
      const endHour = item.end / 100;
      const endMinute = item.end % 100;
  
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
      startTimeElement.textContent = getFormattedTime(startHour, startMinute, 0);
  
      const endTimeElement = document.createElement('span');
      endTimeElement.textContent = getFormattedTime(endHour, endMinute, 0);
  
      const timeContainer = document.createElement('div');
      timeContainer.className = 'start-end-time';
      timeContainer.appendChild(startTimeElement);
      timeContainer.appendChild(endTimeElement);
  
      taskElement.appendChild(timeContainer);
  
      document.body.appendChild(taskElement);
}

const EventsCard = ({ events }) => {
  useEffect(() => {
    // Initial call to functions
    populateDropdowns();
    updateProgressBar();

    // Set up an interval to run the updateProgressBar function every second
    const intervalId = setInterval(updateProgressBar, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function connectGoogleCalendar() {
    // Your logic for connecting to Google Calendar here
    events.map((item) => (
      createTaskFromGoogle(item)
              ));
  }

  return (
    // Your JSX content here
    //<div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
//     //   {events.map((item) => (
//     //     <EventSingleCard key={item._id} event={item} />
//     //   ))}
<div>
  <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PROGTIMIZE</title>
        <link rel="stylesheet" href="index.css" />
    </head>
    <body>
    <h2>PROGTIMIZE</h2>
    <p style={{ fontStyle: 'italic', marginTop: 0, marginBottom: '25px' }}>
      Reinventing The Clock
    </p>
    </body>
    <div className="time-display" id="currentTime">
          00:00:00
    </div>

    <div className="custom-time">
          Task Name: <input type="text" id="taskName" />
          Start: <select id="startHour"></select>:<select id="startMinute"></select>
          End: <select id="endHour"></select>:<select id="endMinute"></select>
          <button className="add-task" onClick={addTask}>
            Add Task
          </button>
    </div>

    <div className="progress-container">
          <div className="progress-bar" id="mainProgressBar">
            <div className="progress" id="dayProgress"></div>
          </div>
          <div className="start-end-time">
            <span>00:00:00</span>
            <span>23:59:59</span>
          </div>
        </div>

        <button className="connect-btn" onClick={connectGoogleCalendar}>
          Connect to Google Calendar
        </button>

        <script src="Scripts.js"></script>

    </div>
  );
};

export default EventsCard;

