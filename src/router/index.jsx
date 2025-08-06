import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../routes/Home";
import SignIn from "../routes/SignIn";
import Header from "../components/Header";
import Calculator from "../routes/Calculator";
import Bmi from "../components/Calculator/Bmi";
import Calories from "../components/Calculator/Calories";
import Recipes from "../routes/Recipes";
import RecipeInfo from "../components/Recipes/RecipeInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        {/* <Header /> */}
        <Home />
      </>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <>
        <Header />
        <SignIn />
      </>
    ),
  },
  {
    path: "/calculator",
    element: <Calculator />,
    children: [
      { index: true, element: <Bmi /> },
      { path: "bmi", element: <Bmi /> },
      { path: "calories", element: <Calories /> },
    ],
  },
  {
    path: "/recipes",
    element: <Recipes />,
  },
  {
    path: "/recipes/:id",
    element: <RecipeInfo />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default router;
