import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LevelLeaderboard from "./LevelLeaderboard";

export default function Level() {
  const { id } = useParams();
  const [level, setLevel] = useState(null);
  const [time, setTime] = useState(null);
  const [started, setStarted] = useState(false);
  const [guess, setGuess] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [lastTime, setLastTime] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/images/${id}.jpg`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setLevel(data));
  }, [id]);

  function handleStart() {
    fetch("/api/v1/times", {
      credentials: "include",
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ imageId: level?.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStarted(true);
        setTime(data);
        setCorrect(false);
      });
  }

  function handleGuess(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const guessX = e.clientX - rect.left;
    const guessY = e.clientY - rect.top;

    setGuess([guessX, guessY]);
  }

  function handleSubmit() {
    if (guess === null) return;

    fetch(`/api/v1/times/${time?.id}`, {
      credentials: "include",
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: time?.id,
        guessX: guess[0],
        guessY: guess[1],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.endTime) {
          setTime(data);
          setCorrect(true);
          setStarted(false);
          setLastTime(data.durationMs);
        }
      });
  }

  return (
    <div>
      <h1>Level {id}</h1>
      <img
        src={`/images/${id}.jpg`}
        alt={`Level ${id}`}
        onClick={handleGuess}
      />
      <p>Find Michael!</p>
      <button onClick={handleStart} disabled={started}>
        Start
      </button>
      <button
        onClick={handleSubmit}
        disabled={guess === null || started === false || correct === true}
      >
        Submit
      </button>
      {lastTime && <p>Last time: {lastTime} ms</p>}
      {level && <LevelLeaderboard id={level?.id} />}
    </div>
  );
}
