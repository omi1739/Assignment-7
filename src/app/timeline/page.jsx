"use client";

import { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { HiVideoCamera } from "react-icons/hi";

const TimelinePage = () => {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load interactions from localStorage
    const storedInteractions = localStorage.getItem("friendInteractions");
    if (storedInteractions) {
      try {
        const parsed = JSON.parse(storedInteractions);
        // Sort by timestamp (newest first)
        const sorted = parsed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setInteractions(sorted);
      } catch (error) {
        console.error("Error parsing interactions:", error);
      }
    }
    setLoading(false);
  }, []);

  const getInteractionIcon = (type) => {
    switch (type) {
      case "call":
        return <FaPhone className="text-blue-600" />;
      case "text":
        return <MdMessage className="text-green-600" />;
      case "video":
        return <HiVideoCamera className="text-purple-600" />;
      default:
        return null;
    }
  };

  const getInteractionLabel = (type) => {
    switch (type) {
      case "call":
        return "Call";
      case "text":
        return "Text";
      case "video":
        return "Video";
      default:
        return "Interaction";
    }
  };

  if (loading) {
    return (
      <div className="w-[90%] mx-auto py-10">
        <h1 className="text-4xl font-bold mb-8">Timeline</h1>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto py-10 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Timeline</h1>

      {interactions.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-8 text-center">
          <p className="text-gray-500 text-lg">
            No interactions yet. Start by visiting a friend's profile and clicking Call, Text, or Video!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {interactions.map((interaction) => (
            <div
              key={interaction.id}
              className="bg-white border-2 border-dashed border-blue-400 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                    {getInteractionIcon(interaction.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-lg">
                      {getInteractionLabel(interaction.type)} with {interaction.friendName}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{interaction.message}</p>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>
                      {new Date(interaction.timestamp).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>&nbsp;•&nbsp;</span>
                    <span>
                      {new Date(interaction.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimelinePage;
