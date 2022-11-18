const mongoose = require("mongoose");
// ========================================================================================
// a naming convention inside JS is any varibale starting with Capital letter is either a class or a constructor function
// ========================================================================================

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
