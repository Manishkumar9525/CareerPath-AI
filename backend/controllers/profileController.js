const Roadmap = require("../models/Roadmap");

exports.getProfileStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const roadmaps = await Roadmap.find({ userId });

    let totalRoadmaps = roadmaps.length;
    let totalTasks = 0;
    let completedTasks = 0;

    roadmaps.forEach((roadmap) => {
      roadmap.steps.forEach((month) => {
        month.weeks.forEach((week) => {
          week.tasks.forEach((task) => {
            totalTasks++;
            if (task.completed) completedTasks++;
          });
        });
      });
    });

    const progress =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    res.json({
      success: true,
      totalRoadmaps,
      totalTasks,
      completedTasks,
      progress,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};