const jwt = require('jsonwebtoken');
const User = rqeuire('../models/user_model');

const createToken = (id) => {
  return jwt.sign({ id }, 'supersecret', {
    expiresIn: 3 * 60 * 60,
  });
};

const login_get = (req, res) => {
  res.render('login', { title: 'Login' });
};

const login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const foundUser = await User.findOne({ email: email });
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
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.create({ email, password });
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
  res.cookie('jwt', '', { maxAge: 1 });
};
const profile = (req, res) => {
  res.render('profile', { title: 'Your profile' });
};

module.exports = {
  login_get,
  login_post,
  signup_get,
  signup_post,
  logout,
  profile,
};
