import React from "react";
import { motion } from "framer-motion";
import "./styles/BMITimeline.css";

const BMITimeline = ({ bmiHistory = [] }) => {
  const getCategoryClass = (category) => {
    switch (category) {
      case "Underweight":
        return "underweight";
      case "Normal weight":
        return "normal";
      case "Overweight":
        return "overweight";
      case "Obese":
        return "obese";
      default:
        return "";
    }
  };

  return (
    <div className="bmi-timeline">
      <h2>Your BMI History:</h2>
      {bmiHistory.length > 0 ? (
        <div className="timeline-container">
          {bmiHistory.map((entry, index) => (
            <motion.div
              key={index}
              className={`timeline-entry ${getCategoryClass(entry.category)}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="timeline-date">{entry.date}</p>
              <div className="timeline-dot"></div>
              <p className="timeline-bmi">BMI: {entry.bmi}</p>
              <p className="timeline-category">{entry.category}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p>No BMI history available.</p>
      )}
    </div>
  );
};

export default BMITimeline;
