export default function Header({ user, setUser, reload, setReload }) {
  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/v1/auth/logout", {
      credentials: "include",
      method: "POST",
    });

    if (res.ok()) {
      setUser(null);
      setReload(reload + 1);
    }
  }

  return (
    <div>
      <nav>
        {user ? (
          <form onSubmit={handleSubmit}>
            <label>
              <button type="submit">Logout</button>
            </label>
          </form>
        ) : (
          <>
            <a href="/register">Register</a>
            <a href="/login">Login</a>
          </>
        )}
      </nav>
    </div>
  );
}
