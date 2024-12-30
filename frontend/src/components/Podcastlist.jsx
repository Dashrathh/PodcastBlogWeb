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
    }; ``

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
          <div
          role="status"
          className="fixed inset-0 flex items-center justify-center bg-white z-50"
        >
          <div className="text-center">
            <svg
              className="w-16 h-16 mb-4 animate-spin text-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <p className="text-xl font-semibold text-gray-700">Loading podcast...</p>
          </div>
        </div>
        )
        }
      </div>
    </div>
  );
};

export default PodcastList;
