export default function Header({ user, setUser }) {
  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/v1/auth/logout", {
      credentials: "include",
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
    }
  }

  return (
    <div>
      <nav>
        <a href="/levels">Levels</a>
        {user ? (
          <form onSubmit={handleSubmit}>
            <label>
              <button type="submit">Logout</button>
            </label>
          </form>
        ) : (
          <>
            <a href="/auth/register">Register</a>
            <a href="/auth/login">Login</a>
          </>
        )}
      </nav>
    </div>
  );
}
