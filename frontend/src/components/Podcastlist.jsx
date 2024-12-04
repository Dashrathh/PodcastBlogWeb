import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa"; // Icons for play and pause

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingPodcastId, setPlayingPodcastId] = useState(null);

  // Fetch podcasts from the API
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/podcasts");
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setPodcasts(result.data);
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
      setCurrentAudio(newAudio);
      setPlayingPodcastId(podcastId);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h1 className="text-3xl font-bold text-center mb-6">All Podcasts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 lg:px-16">
        {podcasts.length > 0 ? (
          podcasts.map((podcast) => (
            <div
              key={podcast._id}
              className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow"
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
