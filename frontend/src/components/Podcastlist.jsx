import React, { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa"; // Icons for play, pause, forward, backward
import { BACKEND_API } from "../util/api";

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingPodcastId, setPlayingPodcastId] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressBarRef = useRef(null);

  // Fetch podcasts from the API
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await BACKEND_API.get("/podcasts");
        
        if (response.data && Array.isArray(response.data.data)) {
          setPodcasts(response.data.data);
        } else {
          setPodcasts([]); // Fallback if the API response is invalid
        }
      } catch (error) {
        console.error("Error fetching podcasts:", error.message);
      }
    };

    fetchPodcasts();
  }, []);

  // Function to handle play and pause
  const handlePlayPause = (audioUrl, podcastId) => {
    if (currentAudio && playingPodcastId === podcastId) {
      currentAudio.pause(); // Pause current audio
      setPlayingPodcastId(null);
    } else {
      if (currentAudio) {
        currentAudio.pause(); // Stop any previously playing audio
      }

      const newAudio = new Audio(audioUrl);
      newAudio.play();
      newAudio.playbackRate = playbackSpeed; // Set playback speed
      setCurrentAudio(newAudio);
      setPlayingPodcastId(podcastId);
      setDuration(newAudio.duration);

      newAudio.addEventListener("timeupdate", () => {
        setCurrentTime(newAudio.currentTime);
      });

      newAudio.addEventListener("loadedmetadata", () => {
        setDuration(newAudio.duration);
      });

      newAudio.addEventListener("ended", () => {
        setPlayingPodcastId(null);
      });
    }
  };

  // Function to change playback speed
  const changePlaybackSpeed = (speed) => {
    if (currentAudio) {
      currentAudio.playbackRate = speed;
    }
    setPlaybackSpeed(speed);
  };

  // Function to handle manual seek
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    if (currentAudio) {
      currentAudio.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  // Format time as mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h1 className="text-3xl font-bold text-center mb-6">All Podcasts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 lg:px-16">
        {podcasts.length > 0 ? (
          podcasts.map((podcast) => (
            <div
              key={podcast._id}
              className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow  object-cover"
            >
              <img
                src={podcast.thumbnail}
                alt={podcast.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-bold mt-2">{podcast.title}</h3>
              <p className="text-gray-600 mt-1">{podcast.description.slice(0, 50)}...</p>
              <p className="text-sm text-gray-500 mt-1">Author: {podcast.author}</p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-300 flex items-center"
                  onClick={() => handlePlayPause(podcast.audioFile, podcast._id)}
                >
                  {playingPodcastId === podcast._id ? (
                    <>
                      <FaPause className="mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <FaPlay className="mr-2" />
                      Play
                    </>
                  )}
                </button>
              </div>
              {playingPodcastId === podcast._id && (
                <div className="mt-4 flex flex-col items-center space-y-2">
                  <div className="flex justify-around w-full">
                    <button
                      onClick={() => currentAudio && (currentAudio.currentTime = Math.max(currentAudio.currentTime - 10, 0))}
                      className="text-sm text-blue-600"
                    >
                      <FaBackward className="mr-1" /> -10s
                    </button>
                    <button
                      onClick={() => currentAudio && (currentAudio.currentTime = Math.min(currentAudio.currentTime + 10, currentAudio.duration))}
                      className="text-sm text-blue-600"
                    >
                      +10s <FaForward className="ml-1" />
                    </button>
                  </div>
                  <input
                    type="range"
                    className="w-full mt-2"
                    min="0"
                    max="100"
                    value={(currentTime / duration) * 100 || 0}
                    onChange={handleSeek}
                  />
                  <div className="text-gray-600 text-sm mt-1">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                  <div className="flex space-x-4 items-center">
                    <button
                      onClick={() => changePlaybackSpeed(0.5)}
                      className={`py-1 px-2 rounded ${playbackSpeed === 0.5 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                      0.5x
                    </button>
                    <button
                      onClick={() => changePlaybackSpeed(1)}
                      className={`py-1 px-2 rounded ${playbackSpeed === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                      1x
                    </button>
                    <button
                      onClick={() => changePlaybackSpeed(1.5)}
                      className={`py-1 px-2 rounded ${playbackSpeed === 1.5 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                      1.5x
                    </button>
                    <button
                      onClick={() => changePlaybackSpeed(2)}
                      className={`py-1 px-2 rounded ${playbackSpeed === 2 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                      2x
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No podcasts available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default PodcastList;
