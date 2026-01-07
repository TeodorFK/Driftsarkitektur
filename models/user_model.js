const { Schema, model } = require('mongoose');
const argon2 = require('argon2');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userShcema.pre('save', async function (next) {
  if (!this.isModified('password')) return;
  this.password = await argon2.hash(this.password);
});

const User = model('user', userSchema);
module.exports = User;
