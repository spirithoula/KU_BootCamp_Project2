const router = require('express').Router();
var AWS = require("aws-sdk");
const fs = require('fs');
const multer = require("multer");
const multerS3 = require('multer-s3');
const path = require("path");
const { User, Member, Event, EventDayTimeLocation, Location } = require('../../models');
const withAuth = require('../../utils/auth');

const S3_KEY = process.env.DB_ACCESS;
const S3_SECRET = process.env.DB_SECRET;

//api/users/signup
//
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(userData);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err);
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
      res.redirect('/');
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// API create new Member
//api/users/member

//member api routes
router.get('/member/:id', async (req, res) => {
  try {
    const memberDataId = await Member.findAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          required: true,
          attributes: ['name'],
        },
      ],
    });
    console.log(memberDataId);
    res.status(200).json(memberDataId);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
  });
  // create new member
  //api/users/member/:id
  router.post('/member/', withAuth, async (req, res) => {
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
  
  router.put('/member/:id', withAuth, async (req, res) => {
    // Calls the update method on the Book model
    Member.update(
      {
        // All the fields you can update and the data attached to the request body.
        physicians: req.body.physicians,
        bloodtype: req.body.bloodtype,
        allergies: req.body.allergies,
        conditions: req.body.conditions,
        prescriptions: req.body.prescriptions,

      },
      {
       
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedMember) => {
        // Sends the updated book as a json response
        res.json(updatedMember);
      })
      .catch((err) => res.json(err));
  });
  // API Delete new member
  //api/users/member/id
  router.delete('/member/:id', withAuth, async (req, res) => {
    try {
      const memberData = await Member.destroy({
        where: {          
          id: req.params.id,
        },
      });
      return;
    }

    res.status(200).json(memberData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// API Delete new member
//api/users/member/id
router.delete('/member/:id', withAuth, async (req, res) => {
  try {
    const memberData = await Member.destroy({
      where: {
        id: req.params.id,
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
router.get('/api/event/', async (req, res) => {
  try {
    const eventData = await Event.findAll({
      attributes: [['date', 'title', 'start']],
      group: ['date'],
    });
    console.log(eventData);
    res.status(200).json(eventData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

//api/users/ image update
AWS.config.region = "us-east-2";    

    const s3 = new AWS.S3({
      accessKeyId: S3_KEY,
      secretAccessKey: S3_SECRET
    });

    const uploadS3 = multer({
      storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'ever24',
        metadata: (req, file, cb) => {
          cb(null, {fieldName: file.fieldname})
        },
        key: (req, file, cb) => {
          cb(null, Date.now().toString() + '-' + file.originalname)
        }
      })
    });

    router.patch('/:id/profile-image', uploadS3.single('file'),(req, res) => {
      console.log("HERE IS THE FILE:", req.file);

      const url = req.file.location;

      User.update(
        {
          profileImage: url,
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
        .then((affectedRows) => {
          if (affectedRows[0] !== 1) {
            return res.status(500).end();
          }

          const returnData = {
            profileImage: url,
          };

          res.write(JSON.stringify(returnData));
          res.end();
        })
        .catch((reason) => {
          console.error(reason);
          res.status(500).end();
        });
    });

    router.patch('/member/:id/profile-image', uploadS3.single('file'),(req, res) => {
      console.log("HERE IS FILE 2:", req.file);

      const url = req.file.location;

      Member.update(
        {
          profileImage: url,
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
        .then((affectedRows) => {
          if (affectedRows[0] !== 1) {
            return res.status(500).end();
          }

          const returnData = {
            profileImage: url,
          };

          res.write(JSON.stringify(returnData));
          res.end();
        })
        .catch((reason) => {
          console.error(reason);
          res.status(500).end();
        });
    });

    router.patch('/member/:id/insurance-image', uploadS3.single('file'),(req, res) => {
      console.log("HERE IS FILE 3:", req.file);

      const url = req.file.location;

      Member.update(
        {
          insuranceCard: url
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
        .then(affectedRows => {
          if (affectedRows[0] !== 1) {
            return res.status(500).end();
          }

          const returnData = {
            insuranceCard: url
          };

          res.write(JSON.stringify(returnData));
          res.end();
        })
        .catch(reason => {
          console.error(reason);
          res.status(500).end();
        });
    });

    router.patch('/:id/insurance-image', uploadS3.single('file'),(req, res) => {
      console.log("HERE IS FILE 4:", req.file);

      const url = req.file.location;

      Member.update(
        {
          insuranceCard: url
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
        .then(affectedRows => {
          if (affectedRows[0] !== 1) {
            return res.status(500).end();
          }

          const returnData = {
            insuranceCard: url
          };

          res.write(JSON.stringify(returnData));
          res.end();
        })
        .catch(reason => {
          console.error(reason);
          res.status(500).end();
        });
    });

    


// Search API
router.get("/search/:input", function(req, res) {
  console.log(req.params.input, "hit api");
  var searchInput = req.params.input;
  var data = {
    member: [],
    users: [],
  };
  User.findAll({
    where: {
      name: searchInput,
    },
    attributes: ['id', 'name'],
    include: [
      {
        model: Member,
        attributes: [
          'name',
          'gender',
          'bio',
          'weight',
          'height',
          'physicians',
          'bloodtype',
          'conditions',
          'profileImage',
        ],
      },
    ],
  }).then((users) => {
    data.users = users;

    Member.findAll({
      where: {
        name: searchInput,
      },
      include: [
        {
          model: User,
          required: true,
          attributes: ['name'],
        },
      ],
    }).then((member) => {
      data.member = member;

      res.json(data);
    });
  });

  console.log(data);
});
//end of module exports

module.exports = router;
