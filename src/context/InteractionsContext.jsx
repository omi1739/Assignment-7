"use client";

import React, { createContext, useContext, useState } from "react";

const InteractionsContext = createContext();

export const InteractionsProvider = ({ children }) => {
  const [interactions, setInteractions] = useState([]);

  const addInteraction = (interaction) => {
    setInteractions((prev) => [interaction, ...prev]);
  };

  const getInteractions = () => interactions;

  const getFilteredInteractions = (type) => {
    if (type === "all") return interactions;
    return interactions.filter((i) => i.type === type);
  };

  return (
    <InteractionsContext.Provider
      value={{
        interactions,
        addInteraction,
        getInteractions,
        getFilteredInteractions,
      }}
    >
      {children}
    </InteractionsContext.Provider>
  );
};

export const useInteractions = () => {
  const context = useContext(InteractionsContext);
  if (!context) {
    throw new Error("useInteractions must be used within InteractionsProvider");
  }
  return context;
};
