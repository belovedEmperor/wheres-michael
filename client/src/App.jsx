import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";

function App() {
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    fetch("/api/v1/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  console.log(user);

  return (
    <>
      <Header
        user={user}
        setUser={setUser}
        reload={reload}
        setReload={setReload}
      />
      <Outlet context={{ user, setUser, reload, setReload }} />
    </>
  );
}

export default App;
