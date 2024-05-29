import { useState, useEffect, useRef } from "react";
import "./App.css";
import "./styles.css";
import AppCards from "./Components/AppCards";
import InputSection from "./Components/InputSection";

function App() {
  const [date, setDate] = useState(() => localStorage.getItem("date") || "");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [message, setMessage] = useState("");
  const intervalRef = useRef(null);

  const calculateCountdown = (targetDate) => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const startCountdown = (targetDate) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setMessage(
          "🎉 The countdown is over! What's next on your adventure? 🎉"
        );
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        localStorage.removeItem("countdown");
        clearInterval(intervalRef.current);
      } else {
        const updatedCountdown = calculateCountdown(targetDate);
        setCountdown(updatedCountdown);
        localStorage.setItem("countdown", JSON.stringify(updatedCountdown));
      }
    }, 1000);
  };

  const validateTarget = (e) => {
    e.preventDefault();
    if (date) {
      const targetDate = new Date(date).getTime();
      const calculatedCountdown = calculateCountdown(targetDate);
      if (calculatedCountdown.days > 100) {
        setMessage("Selected time is more than 100 days away 😔!");
      } else {
        setMessage("");
        setCountdown(calculatedCountdown);
        localStorage.setItem("date", date);
        localStorage.setItem("countdown", JSON.stringify(calculatedCountdown));
        startCountdown(targetDate);
      }
    }
  };

  const cancelTimer = (e) => {
    e.preventDefault();
    setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    setDate("");
    setMessage("");
    localStorage.removeItem("countdown");
    localStorage.removeItem("date");
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    const savedDate = localStorage.getItem("date");
    const savedCountdown = localStorage.getItem("countdown");

    if (savedDate) {
      setDate(savedDate);
      const targetDate = new Date(savedDate).getTime();
      startCountdown(targetDate);
    }

    if (savedCountdown) {
      setCountdown(JSON.parse(savedCountdown));
    } else {
      setMessage("");
    }

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Countdown
          <span className="faded-text"> Timer</span>
        </h1>
      </header>
      <InputSection
        validateTarget={validateTarget}
        cancelTimer={cancelTimer}
        date={date}
        setDate={setDate}
      />
      <AppCards countdown={countdown} message={message} />
    </div>
  );
}

export default App;
