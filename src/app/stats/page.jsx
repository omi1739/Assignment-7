"use client";

import { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { HiVideoCamera } from "react-icons/hi";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StatsPage = () => {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Load interactions from localStorage
    const storedInteractions = localStorage.getItem("friendInteractions");
    if (storedInteractions) {
      try {
        const parsed = JSON.parse(storedInteractions);
        setInteractions(parsed);
        generateChartData(parsed);
      } catch (error) {
        console.error("Error parsing interactions:", error);
      }
    }
    setLoading(false);
  }, []);

  const generateChartData = (interactionsList) => {
    const counts = {
      call: 0,
      text: 0,
      video: 0,
    };

    interactionsList.forEach((interaction) => {
      if (interaction.type === "call") counts.call++;
      else if (interaction.type === "text") counts.text++;
      else if (interaction.type === "video") counts.video++;
    });

    const data = [
      { name: "Call", value: counts.call },
      { name: "Text", value: counts.text },
      { name: "Video", value: counts.video },
    ].filter((item) => item.value > 0);

    setChartData(data);
  };

  // Calculate statistics
  const getTotalStats = () => {
    const callCount = interactions.filter((i) => i.type === "call").length;
    const textCount = interactions.filter((i) => i.type === "text").length;
    const videoCount = interactions.filter((i) => i.type === "video").length;
    const totalInteractions = interactions.length;

    return { callCount, textCount, videoCount, totalInteractions };
  };

  // Get unique friends
  const getUniqueFriends = () => {
    const friendSet = new Set(interactions.map((i) => i.friendId));
    return friendSet.size;
  };

  // Get friend interaction breakdown
  const getFriendStats = () => {
    const friendStats = {};

    interactions.forEach((interaction) => {
      if (!friendStats[interaction.friendId]) {
        friendStats[interaction.friendId] = {
          friendName: interaction.friendName,
          friendPicture: interaction.friendPicture,
          call: 0,
          text: 0,
          video: 0,
          total: 0,
        };
      }

      if (interaction.type === "call") friendStats[interaction.friendId].call++;
      else if (interaction.type === "text")
        friendStats[interaction.friendId].text++;
      else if (interaction.type === "video")
        friendStats[interaction.friendId].video++;

      friendStats[interaction.friendId].total++;
    });

    return Object.values(friendStats).sort((a, b) => b.total - a.total);
  };

  const stats = getTotalStats();
  const uniqueFriends = getUniqueFriends();
  const friendStats = getFriendStats();

  // Colors for pie chart
  const COLORS = ["#3b82f6", "#10b981", "#a855f7"];

  if (loading) {
    return (
      <div className="w-[90%] mx-auto py-10">
        <h1 className="text-4xl font-bold mb-8">Stats</h1>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto py-10 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Friendship Analytics</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-4xl font-bold text-blue-600">
            {stats.totalInteractions}
          </p>
          <p className="text-gray-600 mt-2">Total Interactions</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-4xl font-bold text-blue-600">{uniqueFriends}</p>
          <p className="text-gray-600 mt-2">Friends Connected</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-4xl font-bold text-green-600">{stats.callCount}</p>
          <p className="text-gray-600 mt-2">Calls Made</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-4xl font-bold text-purple-600">
            {stats.textCount + stats.videoCount}
          </p>
          <p className="text-gray-600 mt-2">Other Interactions</p>
        </div>
      </div>

      {/* Pie Chart Section */}
      {chartData.length > 0 && (
        <div className="bg-white shadow rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">By Interaction Type</h2>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={150}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} interactions`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Friend-wise Breakdown */}
      {friendStats.length > 0 && (
        <div className="bg-white shadow rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            Friend Interactions Breakdown
          </h2>
          <div className="space-y-4">
            {friendStats.map((friend, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={friend.friendPicture}
                      alt={friend.friendName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">
                        {friend.friendName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {friend.total} total interactions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      {friend.total}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <FaPhone className="text-blue-600 mx-auto mb-1" size={20} />
                    <p className="text-sm font-semibold">{friend.call}</p>
                    <p className="text-xs text-gray-600">Calls</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <MdMessage
                      className="text-green-600 mx-auto mb-1"
                      size={20}
                    />
                    <p className="text-sm font-semibold">{friend.text}</p>
                    <p className="text-xs text-gray-600">Texts</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <HiVideoCamera
                      className="text-purple-600 mx-auto mb-1"
                      size={20}
                    />
                    <p className="text-sm font-semibold">{friend.video}</p>
                    <p className="text-xs text-gray-600">Videos</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {interactions.length === 0 && (
        <div className="bg-white shadow rounded-xl p-8 text-center">
          <p className="text-gray-500 text-lg">
            No interactions recorded yet. Start connecting with your friends!
          </p>
        </div>
      )}
    </div>
  );
};

export default StatsPage;
