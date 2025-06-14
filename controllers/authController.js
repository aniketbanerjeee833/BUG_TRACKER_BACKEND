const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/user');
const { logBug } = require('../models/bug');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await getUserByEmail(email);
    if (existing) {
      await logBug(email, 'Email already registered please login');
      return res.status(400).json({ message: 'Email already registered please login instead' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await createUser(username, email, hashed); // role defaults to USER
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('Registration Error:', err);
    await logBug(email || 'unknown', 'Unexpected registration error');
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      await logBug(email, 'Invalid email');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      await logBug(email, 'Incorrect password');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // const token = jwt.sign(
    //   { id: user.id, email: user.email, role: user.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1d' }
    // );
    const token = jwt.sign(
  { id: user.id, username: user.username, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);


    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error('Login Error:', err);
    await logBug(email || 'unknown', 'Unexpected login error');
    res.status(500).json({ error: 'Login failed' });
  }
};
// const logout = async (req, res, next) => {
//     try {
//         return res.status(200).json({
           
//             success: true,
//             message: "Logged Out!",
             

//         });
//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
// }



module.exports = {
  register,
  login,

};
