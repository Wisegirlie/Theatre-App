import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ROLES } from '../../client/src/constants/roles.js';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  hashed_password: {
    type: String,
    required: 'Password is required',
  },
  salt: {
    type: String,
  },
  role: {
    type: Number,
    required: true,
    default: ROLES.USER, // default for regular user
    enum: [ROLES.USER, ROLES.ADMIN], 
  },
},
{timestamps: true});

userSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.path('hashed_password').validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);

userSchema.methods = {
  authenticate: function (plainText) {
    return bcrypt.compareSync(plainText, this.hashed_password);
  },
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return bcrypt.hashSync(password, 10);
    } catch (err) {
      console.log(err);
      return '';
    }
  },
  makeSalt: function () {
    return bcrypt.genSaltSync(10);
  }
};

export default mongoose.model('User', userSchema);
