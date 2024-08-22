const mongoose = require("mongoose");

const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  profilePicture: { type: Array, default: [] },
 
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("UserAuthModel", user);
