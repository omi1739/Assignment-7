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
import { useInteractions } from "@/context/InteractionsContext";

const StatsPage = () => {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const { getInteractions } = useInteractions();
  const interactions = getInteractions();

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

  useEffect(() => {
    generateChartData(interactions);
  }, [interactions]);

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
  const COLORS = ["#5210C4", "#1C6634", "#4DC472"];

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
