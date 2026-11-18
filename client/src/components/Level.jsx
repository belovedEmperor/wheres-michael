import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Level() {
  const { id } = useParams();
  const [level, setLevel] = useState();

  useEffect(() => {
    fetch(`/api/v1/images/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setLevel(data));
  }, [id]);

  return (
    <div>
      <h1>Level {id}</h1>
      <img src={`/images/${id}.jpg`} alt={`Level ${id}`} />
      <p>Find Michael!</p>
    </div>
  );
}
