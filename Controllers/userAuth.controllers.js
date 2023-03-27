const registerUser = require("../Models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Tokens = require("../Models/token.models");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendEmail");

const signup = async (req, res) => {
  try {
    const user = req.body;

    if (!user.password) {
      return res.status(400).send({ message: "Password is required" });
    }
    // if(user){
    //   return res.send({message : "user has been already registered"})
    // }
    let hashValue = await bcrypt.hash(user.password, 10);

    user.hashedPassword = hashValue;

    delete user.password;

    let newUser = new registerUser(user);

    newUser.save((err, data) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "Error while registering the user", Error: err });
      }
      res
        .status(201)
        .send({ message: "user has been registered succesfully", user: data });
    });
  } catch (error) {
    res.status(500).send({ message: "internal server error", error: "error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await registerUser.findOne({ email: email });

    if (existingUser) {
      const isValidUser = await bcrypt.compare(
        password,
        existingUser.hashedPassword
      );

      if (isValidUser) {
        const token = await jwt.sign(
          { _id: existingUser._id },
          process.env.SECRET_KEY
        ); //Encrytion
        res.cookie("accessToken", token, { expire: new Date() + 86400000 });

        return res
          .status(201)
          .send({ message: "User log-in successfully.", user: existingUser });
      }

      return res.status(401).send({ message: "Invalid credentials" });
    }

    res.status(400).send({ message: "User does not exist." });
  } catch (error) {
    // console.log('Error: ', error)
    res.status(500).send({ message: "Internal Server Error", error: error });
  }
};

const logout = async (req, res) => {
  try {
    await res.clearCookie("accessToken");
    res.status(200).send({ message: "User log out successfully." });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is mandatory" });
    }
    const user = await registerUser.findOne({ email: email });

    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }

    let token = await Tokens.findOne({ userId: user._id });

    if (token) {
      await token.deleteOne();
    }

    let newToken = crypto.randomBytes(32).toString("hex"); //Encryption

    const hashedToken = await bcrypt.hash(newToken, 10);

    const tokenPayload = new Tokens({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
    });

    await tokenPayload.save();

    const link = `https://polite-bombolone-162787.netlify.app/reset-password?token=${newToken}&id=${user._id}`;

    await sendEmail(user.email, "Password Reset Link", {
      name: user.name,
      link: link,
    });

    return res
      .status(200)
      .send({ message: "Email has been sent successfully." });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { userId, token, password } = req.body;

  let resetToken = await Tokens.findOne({ userId: userId });
  if (!resetToken) {
    return res.status(401).send({ message: "Invalid or expired token." });
  }

  const isValid = await bcrypt.compare(token, resetToken.token);

  if (!isValid) {
    return res.status(400).send({ message: "Invalid Token" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  registerUser.findByIdAndUpdate(
    { _id: userId },
    { $set: { hashedPassword: hashedPassword } },
    (err, data) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "Error while resetting password." });
      }
    }
  );

  await resetToken.deleteOne();

  return res
    .status(200)
    .send({ message: "Password has been reset successfully." });
};

module.exports = { signup, login, logout, forgotPassword, resetPassword };
