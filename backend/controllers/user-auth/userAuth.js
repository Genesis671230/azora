const User = require("../../model/schema/userAuthModel");
const argon2 = require("argon2");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Admin register
const adminRegister = async (req, res) => {
  try {
    const { username, password, firstName, lastName, phoneNumber } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      return res
        .status(400)
        .json({ message: "Admin already exist please try another email" });
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user
      const user = new User({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber,
        role: "admin",
      });
      // Save the user to the database
      await user.save();
      res.status(200).json({ message: "Admin created successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("file: ", file);
      const uploadDir = "uploads/User/UserDocuments";
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uploadDir = "uploads/User/UserDocuments";
      const filePath = path.join(uploadDir, file.originalname);

      // Check if the file already exists in the destination directory
      if (fs.existsSync(filePath)) {
        // For example, you can append a timestamp to the filename to make it unique
        const timestamp = Date.now() + Math.floor(Math.random() * 90);
        cb(
          null,
          file.originalname.split(".")[0] +
            "-" +
            timestamp +
            "." +
            file.originalname.split(".")[1]
        );
      } else {
        cb(null, file.originalname);
      }
    },
  }),
});

// User Registration
const register = async (req, res) => {
  const { profilePicture } = req?.files;
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(401)
        .json({ message: "user already exist please try another email" });
    } else {
      // Hash the password
      const hashedPassword = await argon2.hash(password);

      // Create a new user

      const user = new User({
        firstName,
        lastName,
        email: email,
        password: hashedPassword,
        profilePicture: profilePicture ? [profilePicture[0].path] : [],
      });
      // Save the user to the database
      await user.save();
      res.status(200).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error });
  }
};

const index = async (req, res) => {
  try {
    let user = await User.find(); // { deleted: false }
    console.log(user);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const view = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(404).json({ message: "no Data Found." });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

let deleteData = async (req, res) => {
  try {
    const userId = req.params.id;

    // Assuming you have retrieved the user document using userId
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.role !== "admin") {
      // Update the user's 'deleted' field to true
      await User.deleteOne({ _id: userId });
      res.send({ message: "Record deleted Successfully" });
    } else {
      res.status(404).json({ message: "admin can not delete" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteMany = async (req, res) => {
  try {
    const updatedUsers = await User.updateMany(
      { _id: { $in: req.body }, role: { $ne: "admin" } },
      { $set: { deleted: true } }
    );
    res.status(200).json({ message: "done", updatedUsers });
  } catch (err) {
    res.status(404).json({ message: "error", err });
  }
};

const edit = async (req, res) => {
  const { profilePicture } = req?.files;
  console.log(req.files, "this is edit center");
  try {
    let result = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
          profilePicture: profilePicture ? [profilePicture[0].path] : [],
        },
      },
      { new: true }
    );

    res.status(200).json(result);
  } catch (err) {
    console.error("Failed to Update User:", err);
    res.status(400).json({ error: "Failed to Update User" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by username
    const user = await User.findOne({ email, deleted: false });
    console.log(user);
    if (!user) {
      res.status(401).json({ error: "Authentication failed, invalid email" });
      return;
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await argon2.verify(user.password, password);

    if (!passwordMatch) {
      res
        .status(401)
        .json({ error: "Authentication failed,password does not match" });
      return;
    }
    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, "secret_key", {
      expiresIn: "1d",
    });

    res
      .status(200)
      .setHeader("Authorization", `Bearer${token}`)
      .json({ token: token, user });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  register,
  upload,
  login,
  adminRegister,
  index,
  deleteMany,
  view,
  deleteData,
  edit,
};
