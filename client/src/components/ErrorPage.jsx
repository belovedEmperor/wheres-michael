import { useRouteError, isRouteErrorResponse } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    const msgs = error.data?.errors?.map((e) => e.msg ?? e.msg).join(", ");
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        {msgs && <p>{msgs}</p>}
      </>
    );
  }
  return <h1>Something went wrong</h1>;
}
