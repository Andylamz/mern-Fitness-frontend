import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../routes/Home";
import SignIn from "../routes/SignIn";
import Header from "../components/Header";
import Calculator from "../routes/Calculator";
import Bmi from "../components/Calculator/Bmi";
import Calories from "../components/Calculator/Calories";
import Recipes from "../routes/Recipes";
import RecipeInfo from "../components/Recipes/RecipeInfo";
import NotFound from "../components/NotFound";
import Dashboard from "../routes/Dashboard";
import DashboardAddContainer from "../components/Dashboard/LoggedIn/DashboardAddContainer";
import AddStepsPage from "../components/Dashboard/LoggedIn/AddPages/AddStepsPage";
import AddDefaultPage from "../components/Dashboard/LoggedIn/AddPages/AddDefaultPage";
import UpdateWeightPage from "../components/Dashboard/LoggedIn/AddPages/UpdateWeightPage";
import AddExercisePage from "../components/Dashboard/LoggedIn/AddPages/AddExercisePage";
import FoodLogPage from "../components/Dashboard/LoggedIn/AddPages/Food/FoodLogPage";
import SearchFoodPage from "../components/Dashboard/LoggedIn/AddPages/Food/SearchFoodPage";
import AddWaterPage from "../components/Dashboard/LoggedIn/AddPages/AddWaterPage";
import FoodInfoPage from "../components/Dashboard/LoggedIn/AddPages/Food/FoodInfoPage";
import SignUp from "../routes/SignUp";

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
    path: "/sign-up/*",
    element: (
      <>
        <Header />
        <p>To</p>
        <SignUp routing="path" signInUrl="/sign-in" />
      </>
    ),
  },
  {
    path: "/sign-in/*",
    element: (
      <>
        <Header />
        <p className="text-center text-[#c9b26c]">
          To use Demo Account, please enter andy+clerk_test@gmail.com
        </p>
        <p className="text-center text-[#c9b26c]">Demo Verify Code: 424242</p>
        <SignIn routing="path" signUpUrl="/sign-up" />
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
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <AddDefaultPage /> },
      { path: "addSteps", element: <AddStepsPage /> },
      { path: "addWeight", element: <UpdateWeightPage /> },
      { path: "addExercise", element: <AddExercisePage /> },
      { path: "foodlog", element: <FoodLogPage /> },
      { path: "searchFood", element: <SearchFoodPage /> },
      { path: "addWater", element: <AddWaterPage /> },
      { path: "searchFood/:id", element: <FoodInfoPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
