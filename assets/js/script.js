var timeblockEl = $("#timeblock");
var todo = [];

/*checks for local storage. If already exists, display it*/
function getStorage() {
    if (localStorage.schedule) {
        todo = JSON.parse(localStorage.getItem("schedule"));
        if (todo !== null) {
            for (i = 0; i < todo.length; i++){
                var row = timeblockEl.children().eq(todo[i].id);
                row.siblings("textarea").val(todo[i].description);
                row.children().eq(1).val(todo[i].description);
            }
        }

    } 
}

/*creates dynamically the schedule format*/
function displaySchedule() {
    timeblockEl.children().each(function(index){
        timeblockEl.children().eq(index).append("<div class='col-1 time-block hour pt-3'>"+ moment(index + 9, "hh").format("h A") +"</div>");        
        var colorClass = colorTxtarea(moment(index + 9, "hh").format("HH"));
        timeblockEl.children().eq(index).append("<textarea class='col-10 description " + colorClass + "'></textarea>");        
        timeblockEl.children().eq(index).append("<button class='col-1 saveBtn' data-index='" + index + "'><i class='fa fa-thin fa-floppy-disk'></i></button>");
    });
}

/*assigns the color of the 'textarea' based on the current time*/
function colorTxtarea(schedule){
    var hour = moment().format("HH");
    if (hour > schedule){
        return "past";
    }else if (hour == schedule){
        return "present";
    }else {
        return "future";
    }
}

/*checks if there is an old task for the same hour, if does it deletes it */
function checkUpdate(index) {
    for (i = 0; i < todo.length; i++) {
        if (todo[i].id == index) {
            todo.splice(i, 1);
        }
    }
}

/*saves task info*/
timeblockEl.on("click",".saveBtn", function(){    
    var task = {
        id: "",
        description: ""
    };  

    task.description = $(this).siblings("textarea").val();
    task.id = $(this).attr("data-index");
    checkUpdate(task.id);
    if (task.description.trim() !== "") {
        todo.push(task);
    }
    localStorage.setItem("schedule", JSON.stringify(todo));
});

/*set the date and time*/
function setDateTime() {
    $('#currentDay').text(moment().format("dddd, MMMM Do HH:mm:ss"))
}

/*when the doc is ready, writes date, time and displays the schedule*/
$(document).ready(function() {
    setDateTime();
    window.setInterval(setDateTime, 1000);
    displaySchedule();
    getStorage();
})

