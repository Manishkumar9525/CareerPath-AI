const axios = require("axios");

exports.getYouTubeVideos = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query is required",
      });
    }

    // 🔹 STEP 1: Search videos
    const searchRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: `${query} tutorial hindi coding`,
          key: process.env.YOUTUBE_API_KEY,
          maxResults: 10,
          type: "video",
        },
      }
    );

    const videoIds = searchRes.data.items
      .map((item) => item.id.videoId)
      .join(",");

    // 🔹 STEP 2: Get stats (views, likes)
    const statsRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,statistics",
          id: videoIds,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    // 🔹 STEP 3: Format + sort
    let videos = statsRes.data.items.map((item) => ({
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      thumbnail: item.snippet.thumbnails.medium.url,
      views: parseInt(item.statistics.viewCount || 0),
      likes: parseInt(item.statistics.likeCount || 0),
    }));

    // 🔥 SORT BY VIEWS (BEST VIDEOS FIRST)
    videos.sort((a, b) => b.views - a.views);

    // 🔥 TOP 6 only
    videos = videos.slice(0, 6);

    res.json({
      success: true,
      videos,
    });

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};