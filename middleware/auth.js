const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    await jwt.verify(token, 'secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.status(401).redirect('login');
  }
};

module.exports = {
  authenticate,
};
