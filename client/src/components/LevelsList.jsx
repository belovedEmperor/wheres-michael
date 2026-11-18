import { useEffect, useState } from "react";

export default function LevelsList() {
  const [levels, setLevels] = useState();

  useEffect(() => {
    fetch("/api/v1/images", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setLevels(data));
  }, []);

  console.log(levels);

  return (
    <div>
      <h1>Level Selector</h1>
      <ul>
        {levels?.map((level) => (
          <li>
            <a href={`/levels/${level?.filename?.split(".")[0]}`}>
              <img
                src={`/images/${level?.filename}`}
                alt={`Level ${level?.filename}`}
                key={level?.id}
              />
              <h2>Level {level?.filename?.split(".")[0]}</h2>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
