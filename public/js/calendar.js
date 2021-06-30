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
      //time: 'h(:mm)t',
      editable: true,
    },
    events: [
      {
        title: 'Concert',
        lat: 37.5391116,
        lon: -77.4842119,
        date: '2021/06/29',
        allDay: true,
      },
      {
        title: 'Baseball Game',
        lat: 37.5391116,
        lon: -77.4842119,
        date: '2021/06/30',
        allDay: true,
      },
      {
        title: 'Lake',
        lat: 37.5391116,
        lon: -77.4842119,
        date: '2021/07/01',
        allDay: true,
      },
      {
        title: 'Dinner',
        lat: 37.5391116,
        lon: -77.4842119,
        date: '2021/07/02',
        allDay: true,
      },
      {
        title: 'Dog Park',
        lat: 37.5391116,
        lon: -77.4842119,
        date: '2021/07/03',
        allDay: true,
      },
      {
        title: 'BBQ',
        lat: 37.5391116,
        lon: -77.4842119,
        date: '2021/07/04',
        allDay: true,
      },
      {
        title: 'Soccer',
        lat: 37.5391116,
        lon: -77.4842119,
        date: '2021/07/05',
        allDay: true,
      },
      {
        title: 'Park',
        lat: 37.5391116,
        lon: -77.4842119,
        date: '2021/07/06',
        allDay: true,
      },
      {
        title: 'Movie',
        lat: 37.5391116,
        lon: -77.4842119,
        date: '2021/07/07',
        allDay: true,
      },
      {
        title: 'Lake',
        lat: 37.5391116,
        lon: -77.4842119,
        date: '2021/07/08',
        allDay: true,
      },
      {
        title: 'BBQ',
        lat: 37.5391116,
        lon: -77.4842119,
        date: '2021/07/09',
        allDay: true,
      },
      {
        title: 'Pool',
        lat: 37.5391116,
        lon: -77.4842119,
        date: '2021/07/010',
        allDay: true,
      },
    ], //this is where the data for events gets pulled in for the calendar
    eventClick: function (event) {
      $('#successModal').modal('show');
      $('#successModal .modal-body p').text(event.title);
    },
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
      console.log(window.location.href);
    },
  });
}

$(document).ready(function () {
  getCurrentEvents();
});
