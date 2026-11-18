import App from "./App";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import LevelsList from "./components/LevelsList";
import Home from "./components/Home";
import Level from "./components/Level";
import ErrorPage from "./components/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "auth",
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
      {
        path: "levels",
        children: [
          {
            index: true,
            element: <LevelsList />,
          },
          {
            path: ":id",
            element: <Level />,
          },
        ],
      },
    ],
  },
];

export default routes;
