
$(document).ready(function(){
    $('.datepicker').datepicker();
  


// var timeStamp = Math.floor(Date.now() / 1000)
// console.log("timeStamp: " , timeStamp)

// THis is the time format the API is requesting  

var dateFormat = "YYYYMMDD"; 


$("#search").on("click", function (event) {
    event.preventDefault();
    

    // var formattedDate = moment($("#date").val()).format(dateFormatWeWant)
        
    // // add 00 because that's how the API wants us to structure the date in our query
    // var fromDate = formattedDate + "00"; 
    // var toDate = formattedDate + "00"; 
    // console.log("fromDate: " + fromDate);
    // console.log("toDate: " + toDate);

    var userCity = $("#location").val().trim();
    console.log("userCity:", userCity);

    var today = moment();
    var dateEntered = moment($("#date").val().trim());
    
    var reformattedToday = moment(today).format(dateFormat);
    var reformattedDateEntered = moment(dateEntered).format(dateFormat);
    
    // add 00 because that's how the API wants us to structure the date in our query
    var fromDate = reformattedToday + "00"; 
    var toDate = reformattedDateEntered + "00";


var userCity = $("#location").val().trim();
console.log("userCity:", userCity);



var eventAPIKey = "R2SmVPVrHGFhKdGX";
var eventsURL = "http://api.eventful.com/json/events/search?...&date=" + fromDate + "-" + toDate + "&page_size=10&location=" +
 userCity + "&app_key=" + eventAPIKey;

// output format to JSON see: http://api.eventful.com/docs/formats 

// var eventsArray = [];
// var favIcon = "favorite";
// var unFavIcon = "favorite_border";

$.ajax({
    url: eventsURL,
    method: "GET"
    }).then(function (response) {
        var responseJSON = JSON.parse(response)
        console.log("eventsURL: ", eventsURL);

        const { event } = responseJSON.events;

        for (var i = 0; i < event.length; i++) {

            // var e = event[i];
            // var description = e.description ? e.description : "No Description yet. Come check later!";

            // // This is an object constructor to create each event retrieved from the API as an object
            // function EventDisplayed(id, icon, favIcon, unFavIcon, status, title, description, start) {
            //     this.id = id;
            //     this.icon = icon;
            //     this.favIcon = favIcon;
            //     this.unFavIcon = unFavIcon;
            //     this.status = status;
            //     this.title = title;
            //     this.description = description;
            //     this.start = start;
            //     eventsArray.push(this);
            // }

            // and this is how objects can be dynamically created with properties of the constructor and elements of the API + the "for loop"
            // var newEvent = new EventDisplayed(
            //     "<td id='obj-" + timeStamp + "-" + i + ">",
            //     "<td class='icon'> <i class='material-icons' id='icon-" + timeStamp + "-" + i + "'>" + unFavIcon + "</i>",
            //     "favorite",
            //     "favorite_border",
            //     false,
            //     e.title,
            //     description,
            //     moment(e.start_time).format("M/DD H:mm A"),
            // )
            // // those are variable to add html tags dynamically
            //     var eInfo = "<tr class='event'>"; 
            //     var idTag = "<td id='obj-"; 
            //     // var iconTag = "<td class='icon'> <i class='material-icons'>" + newEvent.icon
            //     var eEmphasis = "<td class='title'><strong>"
            //     var eDescription = "<td class ='description'>"
            //     var eDate = "<td class='date'>"
                
            //     // and here I create the row with the attributes of the object + the HTML tags
            //     var eRow = `${eInfo} ${newEvent.id} ${newEvent.icon} ${eEmphasis} ${newEvent.title} ${eDescription} ${newEvent.description} ${eDate} ${newEvent.start}`;
            //     console.log(eRow);

            const description = event[i].description ? event[i].description : "Not Available";
            const start_time = event[i].start_time ? event[i].start_time: "No time info";
            const venue_name = event[i].venue_name ? event[i].venue_name: "No place info";

            
            const eventInfo = $("<tr>").addClass("event-list").html("<td><strong>" + event[i].title + "</strong></td><td>" + description + 
            "</td><td> " + start_time + "<br>" + venue_name + "</td>");
    
            $("#events").append(eventInfo);
        }
    });
});
});