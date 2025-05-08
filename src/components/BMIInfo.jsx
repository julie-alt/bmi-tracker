import React from 'react';
import './styles/BMIInfo.css';
import bmi_img from '../assets/bmi_img.png';

const BMIInfo = () => {
  return(
    <div className = "bmi-info-box">
      <div className = "bmi-info-header-box">
        <div className = "bmi-info-header">
          <h1 className = "bmi-info-title">What is BMI?</h1>
          <p className = "bmi-info-text">BMI, or Body Mass Index, is a simple calculation using a person's height and weight. It helps determine
          if you're underweight, at a healthy weight, overweight, or obese. 
          The formula is as follows:</p>
          <p className = "bmi-info-text bmi-formula">BMI = weight (kg) / (height (m) x height (m))</p>
          <p className = "bmi-info-text">BMI is used to categorize individuals into different weight categories, which can help assess their risk for certain health conditions.</p>
        </div>
        <div className = "bmi-info-img">
           <img className= "bmi_img" src={bmi_img} alt="bmi image" />
        </div>
      </div>
     
      <h2 className = "bmi-info-subtitle">BMI Categories:</h2>
      <table>
        <thead>
          <tr>
            <th>BMI Range</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Below 18.5</td>
            <td>Underweight</td>
          </tr>
          <tr>
            <td>18.5 – 24.9</td>
            <td>Normal weight</td>
          </tr>
          <tr>
            <td>25.0 – 29.9</td>
            <td>Overweight</td>
          </tr>
          <tr>
            <td>30.0 and above</td>
            <td>Obese</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};

export default BMIInfo;