const router = require('express').Router();
const apiRoutes = require('./apiRoutes');

//api/users/----
router.use('/users', apiRoutes);


module.exports = router;
