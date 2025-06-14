const { getAllBugs } = require('../models/bug');
const { logBug } = require('../models/bug');
// // Admin-only: Get all logged bugs
// const getBugsReport = async (req, res) => {
//   try {
//     const bugs = await getAllBugs();
//     return res.status(200).json({ success: true, bugs: bugs});
//   } catch (err) {
//     console.error('Error fetching bugs:', err);
//      await logBug(req.user.email || 'unknown', 'error fetching bugs');
//     return res.status(500).json({ error: 'Error fetching bugs' });
//   }
// };

// module.exports = {
//   getBugsReport,
// };
// controllers/bugController.js


const getBugsReport = async (req, res) => {
  try {
    const bugs = await getAllBugs();
    return res.status(200).json({ success: true, bugs });
  } catch (err) {
    console.error('Error fetching bugs:', err);
    
    const email = req.user?.email || 'unknown';


    return res.status(500).json({ error: 'Error fetching bugs' });
  }
};

module.exports = { getBugsReport };
