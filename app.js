const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bugRoutes = require('./routes/bugs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', authRoutes);
app.use('/api', bugRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
