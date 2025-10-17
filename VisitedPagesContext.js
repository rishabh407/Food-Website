import React, { createContext, useContext, useState } from "react";

const VisitedPagesContext = createContext();

export const VisitedPagesProvider = ({ children }) => {
  const [visitedPages, setVisitedPages] = useState({});

  const markVisited = (page) => {
    setVisitedPages((prev) => ({ ...prev, [page]: true }));
  };

  return (
    <VisitedPagesContext.Provider value={{ visitedPages, markVisited }}>
      {children}
    </VisitedPagesContext.Provider>
  );
};

export const useVisitedPages = () => useContext(VisitedPagesContext);
