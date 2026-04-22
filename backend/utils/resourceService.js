const axios = require("axios");

// 🔥 YouTube Videos (FIXED + OPTIMIZED)
const getYouTubeVideos = async (query) => {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;

    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: `${query} tutorial`,
          maxResults: 5,
          type: "video", // 🔥 IMPORTANT (only videos)
          key: API_KEY,
        },
      }
    );

    return res.data.items
      .filter((item) => item.id.videoId) // 🔥 FIX undefined bug
      .map((item) => ({
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnail: item.snippet.thumbnails.medium.url,
      }))
      .slice(0, 3); // 🔥 only top 3
  } catch (error) {
    console.error("YouTube API Error:", error.message);
    return []; // 🔥 fail-safe
  }
};

// 📚 Courses (can upgrade later)
const getCourses = (topic) => [
  {
    title: `${topic} Full Course`,
    platform: "Udemy",
    url: "https://www.udemy.com",
  },
  {
    title: `${topic} Crash Course`,
    platform: "YouTube",
    url: "https://www.youtube.com",
  },
];

// 📄 Documentation
const getDocs = (topic) => [
  {
    title: `${topic} Official Docs`,
    url: `https://www.google.com/search?q=${topic}+documentation`,
  },
  {
    title: `${topic} MDN Docs`,
    url: "https://developer.mozilla.org",
  },
];

// 🔥 MAIN FUNCTION
const getAllResources = async (topic) => {
  const youtube = await getYouTubeVideos(topic);
  const courses = getCourses(topic);
  const docs = getDocs(topic);

  return { youtube, courses, docs };
};

module.exports = { getAllResources };