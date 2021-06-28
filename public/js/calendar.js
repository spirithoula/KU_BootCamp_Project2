//$(document).ready(function () {
//  // page is now ready, initialize the calendar...
//
//  $('#calendar').fullCalendar({
//    // put your options and callbacks here
//    left: 'Calendar',
//    center: '',
//    right: 'today prev,next',
//  });
//});
function getCurrentEvents() {

  // console.log(response);
  $('#calendar').fullCalendar({
    // themeSystem: 'bootstrap4',
    //events: event,
    selectable: true,
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay',
      editable: true,
    },
    events: [], //this is where the data for events gets pulled in for the calendar
    // eventClick: function (event) {
    //   $('#successModal').modal('show');
    //   $('#successModal .modal-body p').text(event.title);
    // },
    dayClick: function (date, view) {
      console.log('clicked ' + date.format());
      date = date.format();
      window.location.href = '/day/' + date;
    },
    eventClick: function (calEvent, jsEvent, view) {
      // console.log('clicked ', calEvent);
      console.log(calEvent.start._i);
      let date = calEvent.start._i;

      // date = date.format();
      window.location.href = '/day/' + date;
      
    },
  });
}


$(document).ready(function () {
  getCurrentEvents();
});
