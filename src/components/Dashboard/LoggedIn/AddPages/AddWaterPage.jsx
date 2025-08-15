import { useState } from "react";
import SubmitBtn from "./Components/SubmitBtn";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

function AddWaterPage() {
  const [hydration, setHydration] = useState(0);
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { userMongoId, refresh } = useOutletContext();

  function handleHydrationChange(e) {
    setHydration(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const token = await getToken();
    const baseUrl = import.meta.env.VITE_BACKEND_API;
    try {
      const res = await axios.patch(
        `${baseUrl}/api/dashboard/dashboardInfo/hydration`,
        {
          hydration,
          userMongoId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Successfully Added");
        refresh();
        navigate("/dashboard");
      }
    } catch (err) {
      return toast.error("Something Went Wrong");
    }
  }
  return (
    <div className="flex flex-col justify-between h-full items-center gap-10 text-[#6572aa] py-20">
      <h3 className="text-2xl font-semibold">Track Your Hydration</h3>
      <div className="flex flex-col gap-8">
        <div className="flex justify-center text-xl gap-3 items-center w-[245px] text-center">
          <h4 className="flex-1">Water Intake</h4>
        </div>
        <div>
          <input
            type="text"
            className="border outline-none inline-block w-full text-center py-2 rounded-md"
            placeholder="ml"
            onChange={handleHydrationChange}
          />
        </div>
      </div>
      <SubmitBtn handleSubmit={handleSubmit} btnText={"Add Water"} />
    </div>
  );
}

export default AddWaterPage;
