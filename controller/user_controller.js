const login_get = (req, res) => {
  res.render('login', { title: 'Login' });
};

const login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
};

const signup_get = (req, res) => {
  res.render('signup', { title: 'Signup' });
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
};

module.exports = {
  login_get,
  login_post,
  signup_get,
  signup_post,
};
