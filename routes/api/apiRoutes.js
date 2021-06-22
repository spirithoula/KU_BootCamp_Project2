const router = require('express').Router();
var aws = require("aws-sdk");
const fs = require('fs');
const multer = require("multer");
const upload = multer({});
const path = require("path");
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
  
  router.put('/member', withAuth, async (req, res) => {
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
        // Gets the books based on the isbn given in the request parameters
        where: {
          user_id: req.session.user_id,
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

//api/users/ image update
router.patch(
  ":id/profile-image",
  upload.single("file"),
  (request, response) => {
    const fileName = generateFileName(request.file.originalname);

    aws.config.update({
      accessKeyId: "AKIARJT2CDNM6U7HJMVC",
      secretAccessKey: "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"
    });  

    const s3 = new aws.S3();
    const s3Params = {
      Bucket: 'ever24',
      Key: "folder/"+Date.now()+"_"+path.basename(fileName),
      ContentType: request.file.mimetype,
      ACL: "public-read",
      Body: fs.createReadStream(fileName)
    };

    s3.putObject(s3Params, (error, data) => {
      if (error) {
        console.error(error);
        return response.status(500).end();
      }

      const url = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`;

      User.update(
        {
          profileImage: url
        },
        {
          where: {
            id: request.params.id
          }
        }
      )
        .then(affectedRows => {
          if (affectedRows[0] !== 1) {
            return response.status(500).end();
          }

          const returnData = {
            profileImage: url
          };

          response.write(JSON.stringify(returnData));
          response.end();
        })
        .catch(reason => {
          console.error(reason);
          response.status(500).end();
        });
    });
  }
);

//member image update/upload
//api/users/member/:id/profile-image
router.patch(
  "member/:id/profile-image",
  upload.single("file"),
  (request, response) => {
    const fileName = generateFileName(request.file.originalname);

    aws.config.update({
      accessKeyId: "AKIARJT2CDNM6U7HJMVC",
      secretAccessKey: "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"
    });  

    const s3 = new aws.S3();
    const s3Params = {
      Bucket: 'ever24',
      Key: "folder/"+Date.now()+"_"+path.basename(fileName),
      ContentType: request.file.mimetype,
      ACL: "public-read",
      Body: fs.createReadStream(fileName)
    };

    s3.putObject(s3Params, (error, data) => {
      if (error) {
        console.error(error);
        return response.status(500).end();
      }

      const url = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`;

      Member.update(
        {
          profileImage: url
        },
        {
          where: {
            id: request.params.id
          }
        }
      )
        .then(affectedRows => {
          if (affectedRows[0] !== 1) {
            return response.status(500).end();
          }

          const returnData = {
            profileImage: url
          };

          response.write(JSON.stringify(returnData));
          response.end();
        })
        .catch(reason => {
          console.error(reason);
          response.status(500).end();
        });
    });
  }
);

function generateFileName(originalName) {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

  let id = "";
  for (let i = 0; i < 21; i++) {
    const index = Math.floor(64 * Math.random());
    id += alphabet[index];
  }

  return id + path.extname(originalName);
}

  module.exports = router;