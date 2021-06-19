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
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Member }],
    });
    const user = userData.get({ plain: true });
    res.render("profile", 
  {
    ...user,
    logged_in: true,
    title: "User Profile",
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

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('index');
});

//


module.exports = router;