import App from "./App";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

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
      {
        path: "login",
        element: <LoginForm />,
      },
    ],
  },
];

export default routes;
