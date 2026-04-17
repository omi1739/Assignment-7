"use client";

import Link from "next/link";
import friends from "@/data/friends.json";
import { FaPhone, FaTrash } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { HiVideoCamera } from "react-icons/hi";
import { useState, useEffect } from "react";

const FriendDetailsPage = ({ params }) => {
  const [friendId, setFriendId] = useState(null);
  const [friend, setFriend] = useState(null);
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setFriendId(resolvedParams.friendId);
      const foundFriend = friends.find(
        (f) => f.id === parseInt(resolvedParams.friendId),
      );
      setFriend(foundFriend);
    };
    unwrapParams();
  }, [params]);

  const addInteraction = (type) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateString = now.toLocaleDateString();

    const messages = {
      call: `📞 Called ${friend.name}`,
      text: `💬 Texted ${friend.name}`,
      video: `🎥 Video called ${friend.name}`,
    };

    const newInteraction = {
      id: Date.now(),
      type,
      message: messages[type],
      time: timeString,
      date: dateString,
      friendId: friend.id,
      friendName: friend.name,
      friendPicture: friend.picture,
      timestamp: now.toISOString(),
    };

    // Add to local state for display on this page
    setInteractions([newInteraction, ...interactions]);

    // Save to localStorage for timeline
    try {
      const storedInteractions = localStorage.getItem("friendInteractions");
      const allInteractions = storedInteractions
        ? JSON.parse(storedInteractions)
        : [];
      allInteractions.push(newInteraction);
      localStorage.setItem(
        "friendInteractions",
        JSON.stringify(allInteractions),
      );
    } catch (error) {
      console.error("Error saving interaction:", error);
    }
  };

  if (!friend && friendId) {
    return (
      <div className="w-[90%] mx-auto py-10">
        <h1 className="text-4xl font-bold mb-4">Friend Not Found</h1>
        <p className="text-gray-600 mb-4">
          The friend you're looking for doesn't exist.
        </p>
        <Link href="/friends" className="btn btn-primary">
          Back to Friends
        </Link>
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="w-[90%] mx-auto py-10">
        <h1 className="text-4xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-1 space-y-4">
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <img
              src={friend.picture}
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <h2 className="font-semibold text-lg">{friend.name}</h2>

            <div className=" flex flex-col justify-center items-center gap-2.5 mt-2">
              <p
                className={`badge text-white ${friend.status === "overdue" ? "bg-red-700" : friend.status === "almost due" ? "bg-amber-500" : friend.status === "on-track" ? "bg-green-900" : ""}`}
              >
                {friend.status}
              </p>
              <p className="badge bg-green-100 text-green-700">
                {friend.relation}
              </p>
            </div>

            <p className="text-sm text-gray-500 mt-3 italic">"{friend.bio}"</p>
          </div>

          <div className="bg-white shadow rounded-xl p-4 space-y-2">
            <button className="btn w-full"> Snooze</button>
            <button className="btn w-full"> Archive</button>
            <button className="btn w-full text-red-500">
              {" "}
              <FaTrash /> Delete
            </button>
          </div>
        </div>

        <div className="col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{friend.days_since_contact}</p>
              <p className="text-gray-500 text-sm">Days Since Contact</p>
            </div>

            <div className="bg-white shadow rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{friend.goal}</p>
              <p className="text-gray-500 text-sm">Goal (Days)</p>
            </div>

            <div className="bg-white shadow rounded-xl p-4 text-center">
              <p className="text-lg font-bold">
                {new Date(friend.next_due_date).toDateString()}
              </p>
              <p className="text-gray-500 text-sm">Next Due</p>
            </div>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-semibold mb-2">Relationship Goal</h3>
            <p className="text-gray-600">
              Connect every <b>{friend.goal} days</b>
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-semibold mb-4">Quick Check-In</h3>

            <div className="grid grid-cols-3 gap-4">
              <button onClick={() => addInteraction("call")} className="btn">
                {" "}
                <FaPhone /> Call
              </button>
              <button onClick={() => addInteraction("text")} className="btn">
                {" "}
                <MdMessage /> Text
              </button>
              <button onClick={() => addInteraction("video")} className="btn">
                {" "}
                <HiVideoCamera /> Video
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-semibold mb-4">Recent Interactions</h3>

            <div className="flex flex-col gap-3">
              {interactions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No interactions yet. Start by clicking Call, Text, or Video!
                </p>
              ) : (
                interactions.map((interaction) => (
                  <div
                    key={interaction.id}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{interaction.message}</span>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{interaction.time}</p>
                      <p className="text-xs">{interaction.date}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetailsPage;
