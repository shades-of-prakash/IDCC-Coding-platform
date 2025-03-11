import AppResponse from "../utils/AppResponse.js";
import User from "../models/participant.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

const generatedPasswords = new Map();
const SALT_ROUNDS = 10;

const checkUser = async (req, res) => {
  try {
    const { username1, username2 } = req.body;

    if (!username1 || !username2) {
      return res.status(400).json(new AppResponse(400, null, 'Usernames are required'));
    }
    const user = await User.findOne({ 
      $or: [{ username: username1 }, { username: username2 }]
    });

    return res.status(200).json(new AppResponse(200, { exists: !!user }, user ? 'User exists' : 'User does not exist'));

  } catch (error) {
    console.error('Check user error:', error);
    return res.status(500).json(new AppResponse(500, null, 'Internal server error'));
  }
};


const LoginNewUser = async (req, res) => {
  try {
    const { username1, username2, password } = req.body;

    if (!username1 || !username2 || !password) {
      return res.status(400).json(new AppResponse(400, null, 'All fields are required'));
    }

    // Create a unique key for password lookup
    const passwordKey = `${username1}:${username2}`;
    const storedPassword = generatedPasswords.get(passwordKey);

    console.log("stroredpassword",storedPassword)
    console.log("password",password)

    if (!storedPassword || storedPassword !== password) {
      return res.status(401).json(new AppResponse(401, null, 'Invalid password - Please generate a new password'));
    }

    // Check if user exists
    let user = await User.findOne({ username1, username2 });

    if (user) {
      // Update password for existing user
      user.password = await bcrypt.hash(password, SALT_ROUNDS);
    } else {
      // Create a new user without contest details
      user = new User({
        username1,
        username2,
        password: await bcrypt.hash(password, SALT_ROUNDS)
      });
    }

    await user.save();

    // Clean up temporary password after successful login
    generatedPasswords.delete(passwordKey);

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, username1: user.username1, username2: user.username2 },
      process.env.JWT_SECRET,
      { expiresIn: '3h' } // Token expires in 2 hours
    );

    // // Set the token as an HTTP-only cookie (optional)
    // res.cookie('authToken', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production', // Secure flag in production
    //   sameSite: 'Strict',
    //   maxAge: 2 * 60 * 60 * 1000 // 2 hours
    // });

    // Prepare response object (excluding sensitive data)
    const userResponse = {
      username1: user.username1,
      username2: user.username2,
      token
    };

    return res.status(200).json(new AppResponse(200, userResponse, 'Login successful'));

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json(new AppResponse(500, null, 'Internal server error'));
  }
};

const LoginExistingUser = async (req, res) => {
  try {
    const { username1, username2, password } = req.body;

    if (!username1 || !username2 || !password) {
      return res.status(400).json(new AppResponse(400, null, 'All fields are required'));
    }

    // Check if user exists
    const user = await User.findOne({ username1, username2 });
    if (!user) {
      return res.status(404).json(new AppResponse(404, null, 'User not found'));
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(new AppResponse(401, null, 'Invalid credentials'));
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, username1: user.username1, username2: user.username2 },
      process.env.JWT_SECRET,
      { expiresIn: '2h' } // Token expires in 2 hours
    );

    // Set token as an HTTP-only cookie (optional)
    // res.cookie('authToken', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'Strict',
    //   maxAge: 2 * 60 * 60 * 1000 // 2 hours
    // });

    // Prepare response object (excluding sensitive data)
    const userResponse = {
      username1: user.username1,
      username2: user.username2,
      token
    };

    return res.status(200).json(new AppResponse(200, userResponse, 'Login successful'));

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json(new AppResponse(500, null, 'Internal server error'));
  }
};



const GenerateRandomPassword = (req, res) => {
  try {
    const { username1, username2 } = req.body;

    if (!username1 || !username2) {
      return res.status(400).json(new AppResponse(400, null, 'Usernames are required'));
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Store password temporarily in memory with user-specific key
    const passwordKey = `${username1}:${username2}`;
    generatedPasswords.set(passwordKey, password);

    console.log(generatedPasswords)
    // Set timeout to clear password after 5 minutes
    setTimeout(() => {
      generatedPasswords.delete(passwordKey);
    }, 5 * 60 * 1000);

    return res.status(200).json(new AppResponse(200, { password }, 'Password generated successfully'));

  } catch (error) {
    console.error('Error generating password:', error);
    return res.status(500).json(new AppResponse(500, null, 'Internal server error'));
  }
};


process.on('SIGTERM', () => {
  generatedPasswords.clear();
  process.exit(0);
});

export { LoginNewUser,LoginExistingUser, GenerateRandomPassword,checkUser };