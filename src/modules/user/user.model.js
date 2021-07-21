const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

UserSchema.method({
  generatePassword(password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  },
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  },
  safeModel() {
    return _.omit(this.toObject(), ["password", "__v"]);
  },
});

UserSchema.statics = {
  async get(id) {
    const user = await this.findById(id).exec();
    if (!user) {
      throw new Error("No such user exists");
    }
    return user;
  },
  async getByEmail(email) {
    const user = await this.findOne({ email }).exec();
    if (!user) {
      throw new Error("No such user exists");
    }
    return user;
  },
  async getByUsername(username) {
    const user = await this.findOne({ username }).exec();
    if (!user) {
      throw new Error("No such user exists");
    }
    return user;
  },
};

module.exports = mongoose.model("User", UserSchema);
