function getCurrentEvents(){
    $.get("/api/event/active-events", (response) => {
      // console.log(response);
      response.forEach(obj => {
        obj.title = "Active Play Date!";
        
      })
      // console.log(response);
      $('#calendar').fullCalendar({
        // themeSystem: 'bootstrap4',
        events: response,
        selectable: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          // right: 'month'
        },
        dayClick: function (date) {
          console.log('clicked ' + date.format());
          date = date.format();
          window.location.href = "/day/" + date;
        },
        eventClick: function (calEvent, jsEvent, view) {
          // console.log('clicked ', calEvent);
          console.log(calEvent.start._i);
          let date = calEvent.start._i;
  
          // date = date.format();
          window.location.href = "/day/" + date;
        }
      });
      
    })
  }
  
 
  
  
  $(document).ready(function(){
    
    getCurrentEvents();
  });