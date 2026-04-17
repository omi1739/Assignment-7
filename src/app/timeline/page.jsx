"use client";

import { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { HiVideoCamera } from "react-icons/hi";
import { useInteractions } from "@/context/InteractionsContext";

const TimelinePage = () => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const { getInteractions, getFilteredInteractions } = useInteractions();
  const interactions = getInteractions();

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

  // Filter interactions based on selected filter
  const filteredInteractions = getFilteredInteractions(filter);

  // Get count of each interaction type
  const getCounts = () => {
    return {
      all: interactions.length,
      call: interactions.filter((i) => i.type === "call").length,
      text: interactions.filter((i) => i.type === "text").length,
      video: interactions.filter((i) => i.type === "video").length,
    };
  };

  const counts = getCounts();

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

      {/* Filter Timeline Section */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-lg mb-4">Filter Timeline</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`btn ${
              filter === "all" ? "btn-primary" : "btn-outline"
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setFilter("call")}
            className={`btn ${
              filter === "call" ? "btn-primary" : "btn-outline"
            }`}
          >
            <FaPhone /> Call ({counts.call})
          </button>
          <button
            onClick={() => setFilter("text")}
            className={`btn ${
              filter === "text" ? "btn-primary" : "btn-outline"
            }`}
          >
            <MdMessage /> Text ({counts.text})
          </button>
          <button
            onClick={() => setFilter("video")}
            className={`btn ${
              filter === "video" ? "btn-primary" : "btn-outline"
            }`}
          >
            <HiVideoCamera /> Video ({counts.video})
          </button>
        </div>
      </div>

      {filteredInteractions.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-8 text-center">
          <p className="text-gray-500 text-lg">
            No {filter !== "all" ? filter + " " : ""}interactions yet. Start by
            visiting a friend's profile and clicking Call, Text, or Video!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInteractions.map((interaction) => (
            <div
              key={interaction.id}
              className="bg-white border-2 border-dashed border-blue-400 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="shrink-0 mt-1">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                    {getInteractionIcon(interaction.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-lg">
                      {getInteractionLabel(interaction.type)} with{" "}
                      {interaction.friendName}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {interaction.message}
                  </p>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>
                      {new Date(interaction.timestamp).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </span>
                    <span>&nbsp;•&nbsp;</span>
                    <span>
                      {new Date(interaction.timestamp).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
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
