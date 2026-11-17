import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";

export default function AuthForm({ endpoint, type, inputs }) {
  const { user, setUser } = useOutletContext();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  if (user) navigate("/");

  async function handleSubmit(e) {
    e.preventDefault();

    setUser(undefined);

    const res = await fetch(`/api/v1/auth/${endpoint}`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
    });

    if (res.ok) {
      setUser(await res.json());
      navigate("/");
    } else {
      setUser(null);
      setErrors((await res.json()).errors ?? `${type} failed`);
    }
  }

  return (
    <>
      <h1>{type}</h1>
      <form onSubmit={handleSubmit}>
        {inputs}
        <button type="submit" disabled={user === undefined}>
          {user === undefined ? "Loading..." : type}
        </button>
      </form>
      {errors && (
        <ul>
          {errors.map((err) => (
            <li key={crypto.randomUUID()}>{err.msg}</li>
          ))}
        </ul>
      )}{" "}
    </>
  );
}
