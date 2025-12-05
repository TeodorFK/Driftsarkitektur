const Puppy = require('../models/puppy_model');

const index = async (req, res) => {
  try {
    const puppys = await Puppy.find();
    res.render('index', { title: 'Home', puppys });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  index,
};
