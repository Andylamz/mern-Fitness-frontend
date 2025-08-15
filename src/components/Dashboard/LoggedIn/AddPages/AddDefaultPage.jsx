import { Link } from "react-router-dom";
import AddBtnComponenet from "../AddButtons/AddBtnComponenet";

function AddDefaultPage() {
  return (
    <div className="flex flex-col justify-center h-full">
      <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full py-10">
        {/* Steps */}
        <Link to={"/dashboard/addSteps"}>
          <AddBtnComponenet
            btnText={"Add Steps"}
            title={"Track Your Steps"}
            description={"Add your daily step count"}
          />
        </Link>

        {/* Food */}
        <Link to={"/dashboard/foodlog"}>
          <AddBtnComponenet
            btnText={"Log Food"}
            title={"Food Journal"}
            description={"Track your daily meals and calories "}
          />
        </Link>

        {/* Exercise */}
        <Link to={"/dashboard/addExercise"}>
          <AddBtnComponenet
            btnText={"Log Exercise"}
            title={"Workout Log"}
            description={"Record your daily workouts and activities"}
          />
        </Link>

        {/* Weight */}
        <Link to={"/dashboard/addWeight"}>
          <AddBtnComponenet
            btnText={"Update weight"}
            title={"Weight Tracker"}
            description={"Log and track your body weight"}
          />
        </Link>
      </div>
    </div>
  );
}

export default AddDefaultPage;
