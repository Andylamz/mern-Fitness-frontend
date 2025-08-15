import { useState } from "react";
import SubmitBtn from "./Components/SubmitBtn";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate, useOutletContext } from "react-router-dom";

function AddExercisePage() {
  const [exerciseTime, setExerciseTime] = useState(0);
  const { refresh, userMongoId } = useOutletContext();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const estimiatedCalorieBurn = (Number(exerciseTime) * 6).toFixed(0);

  function handleExerciseChange(e) {
    setExerciseTime(+e.target.value);
  }

  function handleNavigate() {
    navigate("/dashboard");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = await getToken();
    const baseUrl = import.meta.env.VITE_BACKEND_API;
    try {
      const res = await axios.patch(
        `${baseUrl}/api/dashboard/dashboardInfo/exercise`,
        {
          userMongoId,
          estimiatedCalorieBurn,
          exerciseTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        handleNavigate();
        refresh();
        toast.success("Exercise Time Added", {
          autoClose: 800,
        });
      }
    } catch {
      toast.error("Something Went Wrong", {
        autoClose: 800,
      });
    }
  }
  return (
    <div className="flex flex-col justify-between h-full items-center gap-10 text-[#6572aa] py-20">
      <h3 className="text-2xl font-semibold">Workout Log</h3>
      <div className="flex flex-col gap-8">
        <div className="text-center w-[245px] flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl">Estimated Calorie Burn</h3>
            <p className="text-xl">{estimiatedCalorieBurn} kcal</p>
          </div>
          <div>
            <input
              type="text"
              className="border outline-none inline-block w-full text-center py-2 rounded-md"
              placeholder="minutes"
              onChange={handleExerciseChange}
            />
          </div>
        </div>
      </div>
      <SubmitBtn btnText={"Add Workout Time"} handleSubmit={handleSubmit} />
    </div>
  );
}

export default AddExercisePage;
