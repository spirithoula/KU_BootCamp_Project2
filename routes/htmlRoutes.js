const router = require('express').Router();
const { Member, User, Location, Event, EventDayTimeLocation } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  try {
    res.render('index', {
      title: 'Ever24',
      layout: 'login',
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', (req, res) => {
  try {
    res.render('createAccount', {
      title: 'New User',
      layout: 'login',
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res, next) => {
  try {
    const memberData = await User.findByPk(req.session.user_id, {
      attributes: { 
        include: ["id", "name", "profileImage"],
        exclude: ['password'] },
      include: [{ model: Member }],
    });

    // Serialize data so the template can read it
    const members = memberData.get({ plain: true });
    res.render('profile', {
      ...members,
      logged_in: true,
      title: 'User Profile',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/event/chat', withAuth, async (req, res, next) => {
  try {
    res.render('event', {
      logged_in: true,
      title: 'Chat',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/calendar', withAuth, async (req, res, next) => {
  try {
    res.render('calendar', {
      logged_in: true,
      title: 'Calendar',
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//event page with rendered locations
router.get('/day/:date', withAuth, (req, res) => {
  Location
  .findAll({
    include: [
      {
        model: Event,
        where: {
          date: req.params.date,
        },
        required: false,
      },
    ],
    order: [
      ["name", "ASC"],
    ],
  })
  .then((parks) => {
    if (parks.length > 0) {
      console.log(parks);
      parks = formatParksForHandlebars(parks);
      const date = formatDate(req.params.date);

      res.render("day", {
        title: date,
        parks: parks,
        parksJson: JSON.stringify(parks),
      });
    } else {
      res.status(404).render("404");
    }
  });
});

router.get('/logout', (req, res) => {
  try {
    res.render('index');
    res.redirect('/');
  } catch (err) {
    res.status(500).json(err);
  }
});


function formatParksForHandlebars(parks) {
  for (let park of parks) {
    park.times = [
      {
        name: "Morning",
        range: "(7am - 12pm)",
        
      },
      {
        name: "Afternoon",
        range: "(12pm - 6pm)",
        
      },
      {
        name: "Evening",
        range: "(6pm - 10pm)",
        
      },
    ];

    park.Event = null;
  }

  return parks;
}
function formatDate(dateOnly) {
  const date = new Date(dateOnly + 'T00:00:00');
  const dateString = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  });

  return dateString;
}


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('/');
});

router.get('*', (req, res) => {
  try {
    res.render('404');
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
