import { useEffect, useState } from "react";

export default function LevelLeaderboard({ id }) {
  const [times, setTimes] = useState(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    fetch(`/api/v1/times?imageId=${id}&sort=asc`, {
      credentials: "include",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setTimes(data));
  }, [id, reload]);

  function handleReload() {
    setReload(reload + 1);
  }

  return (
    <div>
      <button onClick={handleReload}>Reload</button>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {times?.map((time) => (
            <tr key={time?.id}>
              <td>{time?.user?.username}</td>
              <td>{time?.durationMs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
