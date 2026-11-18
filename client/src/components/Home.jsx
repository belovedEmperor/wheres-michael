import { useOutletContext } from "react-router";

export default function Home() {
  const { user } = useOutletContext();

  return (
    <div>
      <img
        src="/images/11.jpg"
        alt="A house in the woods with a shed on the side"
      />
      {!user ? (
        <p>
          Looks like you're not logged in! You must be logged in to compete for
          a score.
        </p>
      ) : (
        <a href="/levels">Level Selector</a>
      )}
    </div>
  );
}
