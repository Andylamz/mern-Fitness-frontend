import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import dateFormat from "./dateFormatFunction";
import SubmitBtn from "./Components/SubmitBtn";

function AddStepsPage() {
  const [steps, setSteps] = useState(0);
  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const { refresh, userMongoId } = useOutletContext();
  const navigate = useNavigate();
  const today = new Date();
  const { getToken } = useAuth();
  today.setHours(0, 0, 0, 0);

  //   Day
  function nextDay() {
    setDate((prev) => {
      const date = new Date(prev);
      if (date.getTime() < today.getTime()) {
        date.setDate(date.getDate() + 1);
        date.setHours(0, 0, 0, 0);
      }
      return date;
    });
  }

  function prevDay() {
    setDate((prev) => {
      const date = new Date(prev);
      date.setDate(date.getDate() - 1);
      date.setHours(0, 0, 0, 0);
      return date;
    });
  }

  //  handle event
  function handleStepsChange(e) {
    setSteps(+e.target.value);
  }

  async function handleSubmitSteps(e) {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_BACKEND_API;
    const token = await getToken();

    try {
      const res = await axios.patch(
        `${baseUrl}/api/dashboard/dashboardInfo/steps`,
        {
          date: dateFormat(date),
          steps: steps,
          userMongoId,
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
        return toast.success(
          `The total steps of the day is now ${res.data.data.steps}`,
          {
            autoClose: 1000,
          }
        );
      }
    } catch (err) {
      return toast.error(err.message, {
        autoClose: 800,
      });
    }
  }

  //    handle navigation
  function handleNavigate() {
    navigate("/dashboard");
  }
  return (
    <div className="flex flex-col justify-between h-full items-center gap-10 text-[#6572aa] py-20">
      <h3 className="text-2xl font-semibold">Track Your Steps</h3>
      <div className="flex flex-col gap-8">
        <div className="flex justify-center text-xl gap-3 items-center w-[245px] text-center">
          <button
            className="px-4 py-1 bg-[#151824] hover:bg-[#303753] cursor-pointer rounded-md"
            onClick={prevDay}
          >
            -
          </button>
          <h4 className="flex-1">
            {date.getTime() === today.getTime()
              ? "Today"
              : date.toLocaleDateString("en-gb", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
          </h4>
          <button
            className="px-4 py-1 bg-[#151824] hover:bg-[#303753] cursor-pointer rounded-md"
            onClick={nextDay}
          >
            +
          </button>
        </div>
        <div>
          <input
            type="text"
            className="border outline-none inline-block w-full text-center py-2 rounded-md"
            placeholder="Steps"
            onChange={handleStepsChange}
          />
        </div>
      </div>
      <SubmitBtn handleSubmit={handleSubmitSteps} btnText={"Add Steps"} />
    </div>
  );
}

export default AddStepsPage;
