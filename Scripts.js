
function connectGoogleCalendar() {
    alert('Connecting to Google Calendar...');
}

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
    document.getElementById('dayProgress').style.width = progressPercentage + '%';

    document.getElementById('currentTime').textContent = getFormattedTime(now.getHours(), now.getMinutes(), now.getSeconds());

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

        taskElement.querySelector('.progress').style.width = taskProgressPercentage + '%';
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

    for (let i = 0; i <= 59; i++) { // All minute options
        minuteDropdowns.forEach(dropdown => {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = String(i).padStart(2, '0');
            dropdown.appendChild(option);
        });
    }
}

function addTask() {
    const taskName = document.getElementById('taskName').value || 'Unnamed Task';
    const startHour = document.getElementById('startHour').value;
    const startMinute = document.getElementById('startMinute').value;
    const endHour = document.getElementById('endHour').value;
    const endMinute = document.getElementById('endMinute').value;

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

populateDropdowns();
updateProgressBar();
setInterval(updateProgressBar, 1000);  // Update every second