import React, { useState, useEffect } from "react";
import "./DailyDeals.css";
import D1 from "../../assets/D1.jpg";
import D2 from "../../assets/D2.jpg";

const DailyDeals = () => {
  // පූය 24ක කාලයක් තත්පර වලින් (24 * 60 * 60)
  const INITIAL_TIME = 24 * 3600;

  // Timer එකේ ඉතිරි කාලය පාලනය කරන State එක
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("deal_timer");
    return savedTime ? parseInt(savedTime, 10) : INITIAL_TIME;
  });

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        localStorage.setItem("deal_timer", newTime); // වෙලාව save කරනවා
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // කාලය ගණනය කිරීම
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // ඉලක්කම් දෙකක් විදිහට පෙන්වන්න (01, 02 වගේ)
  const formatTime = (time) => time.toString().padStart(2, "0");

  return (
    <section className="deals-section">
      <div className="deals-info">
        <h2 className="deals-title">Daily Deals</h2>
        <p className="deals-badge">Limited Time Offers!</p>
        <p className="deals-description">
          Hurry, these deals won’t last long! Grab your favorite handmade items
          at an exclusive discount.
        </p>

        <div className="countdown-timer">
          <div className="time-unit">
            <strong>{formatTime(hours)}</strong>
            <span>Hours</span>
          </div>
          <div className="time-unit">
            <strong>{formatTime(minutes)}</strong>
            <span>Mins</span>
          </div>
          <div className="time-unit">
            <strong>{formatTime(seconds)}</strong>
            <span>Secs</span>
          </div>
        </div>
      </div>

      <div className="deals-grid">
        <div className="promo-card">
          <div className="promo-image">
            <img src={D1} alt="Batik Wall Hanging" />
          </div>
          <h3>Batik Wall Hanging</h3>
          <p className="promo-price">
            LKR 1,500 <span className="old-price">LKR 2,000</span>
          </p>
          <button className="promo-btn">Shop Now</button>
        </div>

        <div className="promo-card">
          <div className="promo-image">
            <img src={D2} alt="Clay Mask" />
          </div>
          <h3>Clay Face Mask</h3>
          <p className="promo-price">
            LKR 800 <span className="old-price">LKR 1,200</span>
          </p>
          <button className="promo-btn">Shop Now</button>
        </div>
      </div>
    </section>
  );
};

export default DailyDeals;