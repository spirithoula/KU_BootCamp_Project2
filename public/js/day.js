const currentDate = window.location.href
  .split('/day/')
  .slice(-1)
  .toString()
  .replace(/[#]/g, '');
console.log(currentDate);

$('#calendar').fullCalendar({
  defaultView: 'agendaDay',
  events: [
    // events go here
  ],
  resources: [],
});
