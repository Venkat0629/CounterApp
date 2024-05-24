import { useState, useEffect } from "react";
import "./App.css";
import "./styles.css";

function App() {
  const [date, setDate] = useState(() => localStorage.getItem("date") || "");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [message, setMessage] = useState("");
  let interval; // Declare interval variable

  const calculateCountdown = (targetDate) => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const validateTarget = (e) => {
    e.preventDefault();
    if (date) {
      const targetDate = new Date(date).getTime();
      const calculatedCountdown = calculateCountdown(targetDate);
      if (calculatedCountdown.days > 100) {
        setMessage("Selected time is more than 100 days away");
      } else {
        setMessage("");
        setCountdown(calculatedCountdown);
        localStorage.setItem("countdown", JSON.stringify(calculatedCountdown));

        // Start the countdown timer
        interval = setInterval(() => {
          const now = new Date().getTime();
          const distance = targetDate - now;

          if (distance <= 0) {
            setMessage(
              "🎉 The countdown is over! What's next on your adventure? 🎉"
            );
            setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            localStorage.removeItem("countdown");
            clearInterval(interval);
          } else {
            const calculatedCountdown = calculateCountdown(targetDate);
            setCountdown(calculatedCountdown);
            localStorage.setItem(
              "countdown",
              JSON.stringify(calculatedCountdown)
            );
          }
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const savedDate = localStorage.getItem("date");
    const savedCountdown = localStorage.getItem("countdown");

    if (savedDate) {
      setDate(savedDate);
    }
    if (savedCountdown) {
      setCountdown(JSON.parse(savedCountdown));
    } else {
      setMessage("");
    }

    // Clean up interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Countdown
          <span className="faded-text"> Timer</span>
        </h1>
      </header>
      <form className="App-section" onSubmit={validateTarget}>
        <input
          className="input-fields"
          type="datetime-local"
          name="input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="input-fields" type="submit">
          Start Time
        </button>
      </form>
      {message ? (
        <div className="faded-text">{message}</div>
      ) : (
        <section className="App-cards">
          <div className="card">
            <div className="dark-text">{countdown.days}</div>
            <div className="light-text">Days</div>
          </div>
          <div className="card">
            <div className="dark-text">{countdown.hours}</div>
            <div className="light-text">Hours</div>
          </div>
          <div className="card">
            <div className="dark-text">{countdown.minutes}</div>
            <div className="light-text">Minutes</div>
          </div>
          <div className="card">
            <div className="dark-text">{countdown.seconds}</div>
            <div className="light-text">Seconds</div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
