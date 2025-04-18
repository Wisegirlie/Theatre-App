import User from '../models/user.model.js';
import { createAccessToken } from '../libs/jwt.js';

//signIn
export const SignIn = async (req, res) => {

  const { email } = req.body;

  try {
    const userFound = await User.findOne({ email })
    if (!userFound) return res.status(400).json({ message: "Email not found" });
    if (!userFound.authenticate(req.body.password)) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    const token = await createAccessToken({ _id: userFound._id, role: userFound.role });
    res.cookie('t', token, { maxAge: 14400000, httpOnly: true });

    return res.json({
      token,
      user: {
        _id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        role: userFound.role,
      },
    });

  } catch (error) {
    console.error('Error during Sign-in:', error);
    return res.status(500).json({ message: "An error occurred during Sign-in. Please try again later." });
  }
};


//signOut
export const SignOut = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Signed out succesfully",
  });
};