import React, { useState, useContext, useEffect } from "react";
import "./styles/BMIForm.css";
import { motion } from "framer-motion";
import { ThemeContext } from "./ThemeContext";

const BMIForm = () => {
  const { theme } = useContext(ThemeContext);
  const [weightUnit, setWeightUnit] = useState("metric");
  const [heightUnit, setHeightUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [bmiHistory, setBmiHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    setBmiHistory(storedHistory);
  }, []);

  const calculateBMI = () => {
    let bmiValue;
    let heightInMeters;
    if (heightUnit === "metric") {
      heightInMeters = parseFloat(height);
    } else {
      const heightInInches = parseFloat(feet) * 12 + parseFloat(inches || 0);
      heightInMeters = heightInInches * 0.0254;
    }
    let weightInKg =
      weightUnit === "metric"
        ? parseFloat(weight)
        : parseFloat(weight) * 0.453592;

    bmiValue = weightInKg / (heightInMeters * heightInMeters);
    bmiValue = bmiValue.toFixed(1);

    const bmiCategory = determineCategory(bmiValue);
    setCategory(bmiCategory);
    setBmi(bmiValue);
    updateBmiHistory(bmiValue, bmiCategory);
  };

  const determineCategory = (bmiValue) => {
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue >= 18.5 && bmiValue < 24.9) return "Normal weight";
    if (bmiValue >= 25 && bmiValue < 29.9) return "Overweight";
    return "Obese";
  };

  const updateBmiHistory = (bmiValue, bmiCategory) => {
    const newEntry = {
      bmi: bmiValue,
      category: bmiCategory,
      date: new Date().toLocaleDateString(),
    };
    const storedHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    const updatedHistory = [newEntry, ...storedHistory].slice(0, 7);
    setBmiHistory(updatedHistory);
    localStorage.setItem("bmiHistory", JSON.stringify(updatedHistory));
  };

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
    <motion.div
      className={`bmi-form ${theme}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="form-title">Enter Your Details</h2>
      <div className="unit-toggle">
        <span className="unit-text">Weight:</span>
        <label>
          <input
            type="radio"
            value="metric"
            checked={weightUnit === "metric"}
            onChange={() => setWeightUnit("metric")}
          />
          Metric (kg)
        </label>
        <label>
          <input
            type="radio"
            value="imperial"
            checked={weightUnit === "imperial"}
            onChange={() => setWeightUnit("imperial")}
          />
          Imperial (lbs)
        </label>
      </div>

      <div className="unit-toggle">
        <span className="unit-text">Height:</span>
        <label>
          <input
            type="radio"
            value="metric"
            checked={heightUnit === "metric"}
            onChange={() => setHeightUnit("metric")}
          />
          Metric (m)
        </label>
        <label>
          <input
            type="radio"
            value="imperial"
            checked={heightUnit === "imperial"}
            onChange={() => setHeightUnit("imperial")}
          />
          Imperial (ft/in)
        </label>
      </div>

      <input
        type="number"
        className="bmi-input"
        placeholder={weightUnit === "metric" ? "Weight (kg)" : "Weight (lbs)"}
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      {heightUnit === "metric" ? (
        <input
          type="number"
          className="bmi-input"
          placeholder="Height (m)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      ) : (
        <div className="imperial-inputs">
          <input
            type="number"
            className="bmi-input"
            placeholder="Feet"
            value={feet}
            onChange={(e) => setFeet(e.target.value)}
          />
          <input
            type="number"
            className="bmi-input"
            placeholder="Inches"
            value={inches}
            onChange={(e) => setInches(e.target.value)}
          />
        </div>
      )}
      <motion.button
        className="calculate-btn"
        onClick={calculateBMI}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Calculate BMI
      </motion.button>
      {bmi && (
        <motion.div
          className={`bmi-result ${getCategoryClass(category)}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3>
            Your BMI: <span className="bmi-value">{bmi}</span>
          </h3>
          <p className="bmi-category">
            Category: <span>{category}</span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BMIForm;
