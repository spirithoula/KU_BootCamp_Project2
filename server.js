const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// var passport = require("./config/passport");



const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
// app.use(passport.initialize());
// app.use(passport.session());

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT} in your browser.`));
});
