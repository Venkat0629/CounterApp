import React from "react";

export default function InputSection({
  validateTarget,
  cancelTimer,
  date,
  setDate,
}) {
  return (
    <form
      className="App-section"
      onSubmit={date ? validateTarget : cancelTimer}
    >
      <input
        className="input-fields"
        type="datetime-local"
        name="input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {!localStorage.getItem("countdown") ? (
        <button className="input-fields" type="submit">
          Start Timer
        </button>
      ) : (
        <button className="input-fields" type="button" onClick={cancelTimer}>
          Cancel Timer
        </button>
      )}
    </form>
  );
}
