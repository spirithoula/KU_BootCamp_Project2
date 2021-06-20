const router = require('express').Router();
const { Member, User } = require('../models'); 
const withAuth = require('../utils/auth');

router.get("/", (req, res) => {
  try {
    res.render("index", 
  {
    title: "Ever24",
    layout: "login",
    logged_in: req.session.logged_in
  });
  }catch (err) {
    res.status(500).json(err);
  }  
});

router.get("/new", (req, res) => {
  try {
    res.render("createAccount", 
  {
    title: "New User",
    layout: "login",
    logged_in: req.session.logged_in
  });
  }catch (err) {
    res.status(500).json(err);
  }  
});

router.get("/profile", withAuth, async (req, res, next) => {
  try {
    const memberData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Member }],
    });


    // Serialize data so the template can read it
    const members = memberData.get({ plain: true });
    res.render("profile", {
    ...members,
    logged_in: true,
    title: "User Profile",
  });
  }catch (err) {
    res.status(500).json(err);
  }  
});

router.get("/calendar", withAuth, async (req, res, next) => {
  try {    
    res.render("calendar", 
  {
    logged_in: true,
    title: "Calendar",
  });
  }catch (err) {
    res.status(500).json(err);
  }  
});

router.get("/logout", (req, res) => {
  try {
    res.render("index")
    res.redirect("/")
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("*", (req, res) => {
  try {
    res.render("404")
  } catch (err) {
    res.status(500).json(err);
  }
});



//
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


module.exports = router;