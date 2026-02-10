const User = require("../models/user.model");

exports.getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newUsersToday = await User.countDocuments({
      createdAt: { $gte: today },
    });

    const adminCount = await User.countDocuments({ role: "admin" });

    res.json({
      totalUsers,
      newUsersToday,
      adminCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
