import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaMicrophoneAlt,
  FaBookOpen,
  FaVolumeUp,
} from "react-icons/fa";

const Home = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingPodcastId, setPlayingPodcastId] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/podcasts");
        const result = await response.json();
        setPodcasts(result.success ? result.data.slice(0, 4) : []);
      } catch (error) {
        console.error("Error fetching podcasts:", error.message);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/blogs");
        const result = await response.json();
        setBlogs(result.success ? result.data.slice(0, 4) : []);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      }
    };

    fetchPodcasts();
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (currentAudio) {
      const updateTime = () => setCurrentTime(currentAudio.currentTime);
      currentAudio.addEventListener("timeupdate", updateTime);
      return () => currentAudio.removeEventListener("timeupdate", updateTime);
    }
  }, [currentAudio]);

  const handlePlayPause = (audioUrl, podcastId) => {
    if (currentAudio && playingPodcastId === podcastId) {
      currentAudio.pause();
      setPlayingPodcastId(null);
    } else {
      if (currentAudio) currentAudio.pause();
      const newAudio = new Audio(audioUrl);
      newAudio.volume = volume;
      newAudio.play();
      newAudio.addEventListener("loadedmetadata", () =>
        setDuration(newAudio.duration)
      );
      setCurrentAudio(newAudio);
      setPlayingPodcastId(podcastId);
    }
  };

  const seekForward = () => {
    if (currentAudio) {
      currentAudio.currentTime = Math.min(
        currentAudio.currentTime + 10,
        currentAudio.duration
      );
    }
  };

  const seekBackward = () => {
    if (currentAudio) {
      currentAudio.currentTime = Math.max(currentAudio.currentTime - 10, 0);
    }
  };

  const handleSeek = (e) => {
    if (currentAudio) {
      currentAudio.currentTime = e.target.value;
      setCurrentTime(e.target.value);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (currentAudio) {
      currentAudio.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="bg-blue-950 text-white py-40">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Podcasts & Blogs</h1>
          <p className="text-lg mb-6">
            Dive into a world of engaging podcasts and insightful blogs curated
            just for you.
          </p>
          <button
            className="bg-white text-blue-600 py-2 px-6 rounded font-semibold hover:bg-gray-100 transition duration-300"
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <FaMicrophoneAlt /> Explore Podcasts
        </h2>
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {podcasts.map((podcast) => (
            <div key={podcast._id} className="bg-white shadow-md rounded-md p-4">
              <img
                src={podcast.thumbnail}
                alt={podcast.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-bold mt-2">{podcast.title}</h3>
              <p className="text-gray-600 mt-1">{podcast.description}</p>
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white py-1 px-4 rounded flex items-center gap-1 mb-2"
                  onClick={() => handlePlayPause(podcast.audioFile, podcast._id)}
                >
                  {playingPodcastId === podcast._id ? <FaPause /> : <FaPlay />}
                  {playingPodcastId === podcast._id ? "Pause" : "Play"}
                </button>
                {playingPodcastId === podcast._id && (
                  <>
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full"
                    />
                    <div className="text-sm flex justify-between mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <button onClick={seekBackward} className="text-blue-600">
                        <FaBackward /> -10s
                      </button>
                      <button onClick={seekForward} className="text-blue-600">
                        <FaForward /> +10s
                      </button>
                      <div className="flex items-center gap-2">
                        <FaVolumeUp />
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-24"

                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <FaBookOpen /> Latest Blogs
        </h2>
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white shadow-md rounded-md p-4">
              <img
                src={blog.images?.[0] || "https://via.placeholder.com/150"}
                alt={blog.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-bold mt-2">{blog.title}</h3>
              <p className="text-gray-600 mt-1">
                {blog.content.slice(0, 50)}...
              </p>
              <button
                className="bg-green-500 text-white py-1 px-4 mt-4 rounded hover:bg-green-600"
                onClick={() => navigate(`/blog/${blog._id}`)}
              >
                Read Blog
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
