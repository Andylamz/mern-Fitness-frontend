import { useState } from "react";
import SubmitBtn from "./Components/SubmitBtn";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useOutletContext } from "react-router-dom";

function UpdateWeightPage() {
  const [updatedWeight, setUpdatedWeight] = useState("");
  const { refresh, userMongoId, todayData } = useOutletContext();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  function handleWeightChange(e) {
    setUpdatedWeight(e.target.value);
  }

  function handleNavigate() {
    navigate("/dashboard");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_BACKEND_API;
    const token = await getToken();
    try {
      const res = await axios.patch(
        `${baseUrl}/api/dashboard/dashboardInfo/weight`,
        {
          updatedWeight,
          userMongoId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        refresh();
        handleNavigate();
        return toast.success("Weight Updated", {
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
      <h3 className="text-2xl font-semibold">Weight</h3>
      <div className="flex flex-col gap-8">
        <div className="text-center  w-[245px] flex flex-col gap-3">
          <h3 className="text-2xl">Current Weight</h3>
          <p className="text-xl">{todayData ? todayData.weight : 0} KG</p>
        </div>
        <div>
          <input
            type="text"
            className="border outline-none inline-block w-full text-center py-2 rounded-md"
            placeholder="KG"
            onChange={handleWeightChange}
          />
        </div>
      </div>
      <SubmitBtn btnText={"Update"} handleSubmit={handleSubmit} />
    </div>
  );
}

export default UpdateWeightPage;
