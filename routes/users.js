var express = require('express');
var router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');

/* GET users listing. */
router.get('/register', (req, res, next) => {
  res.render('users/register');
});

router.post('/register', catchAsync(async (req, res, next) => {
  try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
		 req.login(registeredUser, err => {
        if (err) return next(err);
        // req.flash('success', 'Welcome to Yemp Camp');
        res.redirect('/');
      })
	} catch (e) {
      // req.flash('error', e.message);
      res.redirect('register');
  }
}));

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
  // req.flash('success', 'Welcome back');
  const redirectUrl = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect('/');
});

module.exports = router;
