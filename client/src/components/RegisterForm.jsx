import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";

export default function RegisterForm() {
  const { user, setUser } = useOutletContext();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  if (user) navigate("/");

  async function handleSubmit(e) {
    e.preventDefault();

    setUser(undefined);

    const res = await fetch("/api/v1/auth/register", {
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
      setErrors((await res.json()).errors ?? "Register failed");
    }
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input type="text" name="username" id="username" />
        </label>
        <label>
          Email: <input type="email" name="email" id="email" />
        </label>
        <label>
          Password: <input type="password" name="password" id="password" />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" id="confirmPassword" />
        </label>
        <button type="submit" disabled={user === undefined}>
          {user === undefined ? "Waiting..." : "Register"}
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
