import React from 'react'; // Import React if not already done

function RealWebsite() {
  return (
    <div>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PROGTIMIZE</title>
        <link rel="stylesheet" href="./index2.css" />
      </head>

      <body>
        <h2>PROGTIMIZE</h2>
        <p style={{ fontStyle: 'italic', marginTop: 0, marginBottom: '25px' }}>
          Reinventing The Clock
        </p>

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
      </body>
    </div>
  );
}

export default RealWebsite;
