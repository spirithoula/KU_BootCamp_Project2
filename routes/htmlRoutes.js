  
var db = require("../models");
const withAuth = require('../utils/auth');


module.exports = function(app) {
  app.get("/calendar", withAuth, (request, response) => {
    response.render("calendar", {
      title: "Calendar"
    });
  });

 
  app.get("/user/profile", withAuth, (request, response, next) => {
      response.render("profile", {
        title: "User Profile",
    });
  });

  app.get("/user/new", (request, response) => {
    response.render("createAccount", 
    {
      title: "New User",
      layout: "login"
    });
  });

  app.get("/seeds", (request, response) => {
    response.render("seeds", {title: "Seed page"})
  })

  app.get("/", (request, response) => {
    response.render("index", 
    {
      title: "Ever24",
      layout: "login"
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (request, response) => {
    response.render("404");
  });
};


function formatDate(dateOnly) {
  const date = new Date(dateOnly + "T00:00:00");
  const dateString = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  });
  
  return dateString;
}