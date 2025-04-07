import React from "react";
import BMIResult from "./components/BMIResult.jsx";
import BMIForm from "./components/BMIForm.jsx";
import BMITimeline from "./components/BMITimeline";
import { ThemeProvider } from "./components/ThemeContext.jsx";
import bmiImg from "./assets/bmi-img2.png";
import bmiLogo from "./assets/bmi-logo2.png";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <div>
          <img className="logo" src={bmiLogo} alt="BMI logo" />
          <h1 className="title">Calculate Your BMI</h1>
          <div className="bmi-container">
            <BMIForm />
            <img className="bmi-img" src={bmiImg} alt="BMI image" />
          </div>

          <BMIResult />
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
