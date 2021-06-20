const router = require('express').Router();
// var aws = require("aws-sdk");
// const multer = require("multer");
// const upload = multer({});
// const path = require("path");
const { User, Member, Event, EventDayTimeLocation, Location } = require('../../models');
const withAuth = require('../../utils/auth');

//api/users/signup


router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
      console.log(userData);
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.status(200).json(userData);
      });
    } catch (err) {
      console.error(err)
      res.status(400).json(err);
    }
  });
  //api/users/login
  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
      
      if (!userData) {
        res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      
      const validPassword = await userData.checkPassword(req.body.password);
      
      if (!validPassword) {
        res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
      
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.redirect("/");
        res.status(204).end();
        
      });
    } else {
      res.status(404).end();
    }
  });
  
  
  // API create new Member
  //api/users/member

  //member api routes
  router.get('/api/member/:id', async (req, res) => {
    try {
      const memberDataId = await Member.findAll({
      where: {
        UserID: req.params.id
      },
      include: [
        {
          model: User,
          required: true,
          attributes: ['name']
        }
      ]
      
    });
    console.log(memberDataId);
    res.status(200).json(memberDataId);
  } catch (err) {
    console.error(err)
    res.status(400).json(err);
  }
  });
  // create new member
  router.post('/member', withAuth, async (req, res) => {
    try {
      const newMember = await Member.create({
        ...req.body,
        user_id: req.session.user_id,
      });       
      res.status(200).json(newMember);
    } catch (err) {
      console.error(err)
      res.status(400).json(err);
    }
  });
  
  // API Delete new member
  //api/users/member/id
  router.delete('/member/:id', withAuth, async (req, res) => {
    try {
      const memberData = await Member.destroy({
        where: {          
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!memberData) {
        res.status(404).json({ message: 'No member found with this id!' });
        return;
      }
  
      res.status(200).json(memberData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

 
 // Event API Routes
router.get('/api/event/active-events', async (req, res) => {
  try {
    const eventData = await EventDayTimeLocation.findAll({
    attributes: [['date', 'start']],
    group: ['date']
    
  });
  console.log(eventData);
  res.status(200).json(eventData);
} catch (err) {
  console.error(err)
  res.status(400).json(err);
}
});
  module.exports = router;