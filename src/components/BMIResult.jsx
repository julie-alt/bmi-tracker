import React, { useState, useEffect } from "react";
import BMITimeline from "./BMITimeline";
import { motion } from "framer-motion";
import "./styles/BMIResult.css";

const BMIResult = () => {
  const [bmiHistory, setBmiHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    setBmiHistory(Array.isArray(storedHistory) ? storedHistory : []);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("bmiHistory"); // Remove from localStorage
    setBmiHistory([]); // Reset state
  };

  return (
    <div>
      <BMITimeline bmiHistory={bmiHistory} />
      <motion.button
        className="clear-history-btn"
        onClick={clearHistory}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Clear History
      </motion.button>
    </div>
  );
};

export default BMIResult;
