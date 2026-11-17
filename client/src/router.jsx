import App from "./App";
import RegisterForm from "./components/RegisterForm";

const routes = [
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />
    children: [
      {
        path: "register",
        element: <RegisterForm />,
      },
    ],
  },
];

export default routes;
