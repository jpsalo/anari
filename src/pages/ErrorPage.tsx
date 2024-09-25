import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let errorMessage: string;

  // https://stackoverflow.com/a/76126878/7010222
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.log(error);
    errorMessage = "Unknown error";
  }

  return (
    <p>
      <i>{errorMessage}</i>
    </p>
  );
}
