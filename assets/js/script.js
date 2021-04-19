var currentDate = moment();

// Retrieve events from local storage
var events = JSON.parse(localStorage.getItem('today-events')) || [];

// Paint the full day of time blocks (each time block is 1hr)
function paintDay() {
    
    var currentDayEl = $('#current-date')[0];
    currentDayEl.innerText = moment(currentDate).format("dddd MMMM Do, YYYY");

    var dayBlock = $('#day-block')[0];

    
    for (i=0; i<24; i++) {
        
        // Create a time block
        var timeBlock = $('<div>').appendTo(dayBlock);
        timeBlock.addClass('row');
        timeBlock.addClass('time-block');
        
        // Create a div for the hour
        var hourEl = $('<div>').appendTo(timeBlock);
        hourEl.addClass('col-1');
        hourEl.addClass('hour');
        hourEl[0].innerHTML = moment({hour: i}).format("h A");

        // Create a div for the task textarea
        var taskEl = $('<textarea>');
        taskEl.addClass('col-10');
        taskEl.addClass('description');
        taskEl.attr('id', 'event-'+i);
        taskEl[0].innerText = '';

        timeBlock.append (taskEl);

        // Create a div for the save button
        var saveBtn = $('<button>').appendTo(timeBlock);
        saveBtn.addClass('col-1 saveBtn oi oi-cloud-upload');
        saveBtn.attr('block-hr-id',i);
        saveBtn.click(saveCalendarEvent);

        // Update classes to indicate past, present, and future events
        if (moment(currentDate).format("H") > i) {
            taskEl.addClass('past');
        } else {
            if (moment(currentDate).format("h A") === moment({hour: i}).format("h A")) {
                taskEl.addClass('present');
            } else {
                taskEl.addClass('future');
            }
        }
        
        // Populate the events array (even if time slots are empty)
        if (events[i]) {
            taskEl[0].innerText = events[i].description;
        } else {
            // Create event object
            var eventObject = {
                time: parseInt(i),
                description: ''
            }
            events.push(eventObject);
        }
        
    }
    
}

function saveCalendarEvent(event){
    
    // Get hour of the event [0-23]
    var eventHour = this.getAttribute('block-hr-id');
    var eventDescription = $('#event-'+eventHour).val();

    // Store to local storage
    events[eventHour].time = parseInt(eventHour);
    events[eventHour].description = eventDescription ;
    localStorage.setItem('today-events', JSON.stringify(events));

}

paintDay();