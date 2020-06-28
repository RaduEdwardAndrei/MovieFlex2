const express = require('express');
const router = express.Router();
const UserService = require('./service');
const validateRegisterInput = require('../Validation/Users/register');
const validateLoginInput = require('../Validation/Users/login');
const { authorizeAndExtractToken } = require('../security/Jwt');

// ruta localhost:5000/mofieflex/users/register
router.post('/register', async (req, res, next) => {

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const {
      username,
      firstName,
      lastName,
      email,
      password
  } = req.body;

  try {
    await UserService.addUser(
      username,
      firstName,
      lastName,
      email,
      password
    );
    
    res.status(201).send('A verification email has been sent to ' + email + '.');

    } catch (err) {
      // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in server.js 
      next(err);
    }
});

// ruta localhost:5000/mofieflex/users/login
router.post('/login', async (req, res, next) => {

  const { errors, isValid, isUsingEmail } = validateLoginInput(req.body);

  if (!isValid) {
      return res.status(400).json(errors);
  }

  const {
      userInformation,
      password
  } = req.body;

  try {
      const token = await UserService.loginUser(userInformation, password, isUsingEmail);

      res.status(200).json(token);
  } catch (err) {
    // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
    next(err);
}

});

router.get('/checkToken', async (req, res, next) => {
  const token = req.query.token;

  try {
      const response = await UserService.checkToken(token);
      res.status(200).send(response);
  } catch (err) {
      // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
      next(err);
  }

});

router.get('/getProfile', authorizeAndExtractToken, async (req, res, next) => {
  const userId = req.state.decoded.userId;

  try {
      const response = await UserService.getProfile(userId);
      res.status(200).json(response);
  } catch (error) {
      next(error);
  }
});

router.put('/updateProfile', authorizeAndExtractToken, async (req, res, next) => {
  const userId = req.state.decoded.userId;
  
  const {
    firstName,
    lastName,
    email
  } = req.body;

  //const profileImage = saveProfileImage( userId, req.body.profileImage);

  try {
      await UserService.updateProfile(userId, firstName, lastName, email);
      res.status(200).end();
  } catch (error) {
      next(error);
  }
});

module.exports = router;