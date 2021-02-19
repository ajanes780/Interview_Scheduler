import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = (data, replace = false) => {
    if (replace) {
      setHistory((prevHistory) => [...prevHistory, initial]);
    }
    setHistory((prevHistory) => [...prevHistory, data]);
  };

  const back = () => {
    if (history.length <= 1) {
      return;
    }
    setHistory(history.slice(0, history.length - 1));
  };

  return { mode: history[history.length - 1], transition, back };
}
