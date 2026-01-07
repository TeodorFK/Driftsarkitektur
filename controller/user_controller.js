const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const Puppy = require('../models/puppy_model');

const createToken = (id) => {
  return jwt.sign({ id }, 'supersecret', {
    expiresIn: 3 * 60 * 60,
  });
};

const login_get = (req, res) => {
  try {
    res.render('login', { title: 'Login' });
  } catch (err) {
    console.log(err);
  }
};

const login_post = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const foundUser = await User.findOne({ username });
    console.log(foundUser._id);
    if (foundUser.password === password) {
      const token = createToken(foundUser._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 1000 });
      res.status(201).redirect('profile');
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

const signup_get = (req, res) => {
  try {
    res.render('signup', { title: 'Signup' });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

const signup_post = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await User.create({ username, password });
    console.log(user._id);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 1000 });
    res.status(201).redirect('profile');
  } catch (err) {
    console.log(err);
    res.status(400).send('error, user didnt get created');
  }
};
const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};
const profile = async (req, res) => {
  try {
    const puppys = await Puppy.find();
    res.render('profile', { title: 'Your profile', puppys });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  login_get,
  login_post,
  signup_get,
  signup_post,
  logout,
  profile,
};
