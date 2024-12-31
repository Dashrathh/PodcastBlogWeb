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
import { BACKEND_API } from "../util/api";

const Home = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingPodcastId, setPlayingPodcastId] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const[loading,setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await BACKEND_API.get("/podcasts");
        const result = await response.json();
        setPodcasts(result.success ? result.data.slice(0, 4) : []);
      } catch (error) {
        console.error("Error fetching podcasts:", error.message);
      }
      
    };

    const fetchBlogs = async () => {
      try {
        const response = await BACKEND_API.get("/blogs");
        setBlogs(response.data?.data ? response.data.data.slice(0, 4) : []);
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
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-40">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6">Welcome to Podcasts & Blogs</h1>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Dive into a world of engaging podcasts and insightful blogs curated
            just for you.
          </p>
          <button
            className="bg-white text-blue-600 py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition duration-300"
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <FaMicrophoneAlt /> Explore Podcasts
        </h2>
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {podcasts.map((podcast) => (
            <div
              key={podcast._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={podcast.thumbnail}
                alt={podcast.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 truncate">{podcast.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {podcast.description.slice(0, 60)}...
                </p>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center gap-1 shadow-md hover:bg-blue-600 transition-colors"
                  onClick={() => handlePlayPause(podcast.audioFile, podcast._id)}
                >
                  {playingPodcastId === podcast._id ? <FaPause /> : <FaPlay />}
                  {playingPodcastId === podcast._id ? "Pause" : "Play"}
                </button>
                {playingPodcastId === podcast._id && (
                  <div className="mt-4">
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm mt-1">
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
                          className="w-20"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section> 

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <FaBookOpen /> Latest Blogs
        </h2>
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={blog.images?.[0] || "https://via.placeholder.com/150"}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 truncate" >{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-4" dangerouslySetInnerHTML={{ __html:blog.content .slice(0, 60)}}>
                  {/* {blog.content.slice(0, 60)}... */}
                </p>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-colors"
                  onClick={() => navigate(`/blog/${blog._id}`)}
                >
                  Read Blog
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
