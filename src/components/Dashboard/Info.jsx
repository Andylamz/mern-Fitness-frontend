import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

function Info() {
  const [gender, setGender] = useState("male");
  const [ageError, setAgeError] = useState(false);
  const [heightError, setHeightError] = useState(false);
  const [weightError, setWeightError] = useState(false);
  const heightRef = useRef();
  const weightRef = useRef();
  const ageRef = useRef();
  const { user } = useUser();
  const mongoId = user?.publicMetadata?.mongoId;
  const clerkId = user?.id;
  const { getToken } = useAuth();

  function handleOnChange(e) {
    setGender(e.target.value);
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    const weight = weightRef.current.value;
    const height = heightRef.current.value;
    const age = ageRef.current.value;
    const token = await getToken();

    // Validation
    if (!/^\d*$/.test(age) || age.trim() === "") {
      setAgeError(true);
    } else if (/^\d*$/.test(age)) {
      setAgeError(false);
    }
    if (!/^\d*\.?\d*$/.test(weight) || weight.trim() === "") {
      setWeightError(true);
    } else if (/^\d*$/.test(weight)) {
      setWeightError(false);
    }
    if (!/^\d*\.?\d*$/.test(height) || height.trim() === "") {
      setHeightError(true);
    } else if (/^\d*$/.test(height)) {
      setHeightError(false);
    }
    if (
      !/^\d*\.?\d*$/.test(weight) ||
      !/^\d*\.?\d*$/.test(height) ||
      !/^\d*$/.test(age) ||
      weight.trim() === "" ||
      height.trim() === "" ||
      age.trim() === ""
    ) {
      return null;
    }
    const maleBmr = (
      (10 * +weight + 6.25 * +height - 5 * +age + 5) *
      1.2
    ).toFixed(2);
    const femaleBmr = (
      (10 * +weight + 6.25 * +height - 5 * +age - 161) *
      1.2
    ).toFixed(2);
    const bmr = gender === "male" ? maleBmr : femaleBmr;

    //  ----------------------- remember to change this ------------------
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_API;
      const res = await axios.patch(
        `${baseUrl}/api/dashboard/personalDetails`,
        {
          mongoId: mongoId,
          weight: +weight,
          height: +height,
          age: +age,
          bmr: +bmr,
          gender,
          clerkId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg, {
          autoClose: 800,
        });
      }
    } catch {
      toast.error("Failed to add data");
    }
  }

  return (
    <div className="xl:px-35 md:px-10 px-4 mt-20 text-[#6572aa]">
      <h3 className="text-center text-3xl font-semibold mb-8 text-[#c9b26c]">
        Personal Details
      </h3>
      <form className="w-full" onSubmit={handleOnSubmit}>
        <div className="flex lg:flex-row flex-col mx-auto max-lg:max-w-[500px] max-w-[1000px] w-full min-w-0 rounded-md bg-[#252733] justify-center gap-5 py-8">
          {/* Gender */}
          <div className="flex justify-center items-center">
            <label htmlFor="gender" className="inline-block px-2 w-[75px]">
              Gender
            </label>
            <select
              className="inline-block px-1"
              id="gender"
              onChange={handleOnChange}
              value={gender}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          {/* Height */}
          <div className="flex justify-center items-center">
            <label htmlFor="height" className="inline-block px-2 w-[75px]">
              Height
            </label>
            <input
              type="text"
              id="height"
              className={`border max-w-[150px] outline-none px-2 py-1 rounded-md ${
                heightError ? "border-red-500" : ""
              }`}
              ref={heightRef}
            />
          </div>
          {/* Weight */}
          <div className="flex justify-center items-center">
            <label htmlFor="weight" className="inline-block px-2 w-[75px]">
              Weight
            </label>
            <input
              type="text"
              id="weight"
              className={`border max-w-[150px] outline-none px-2 py-1 rounded-md ${
                weightError ? "border-red-500" : ""
              }`}
              ref={weightRef}
            />
          </div>
          {/* Age */}
          <div className="flex justify-center items-center">
            <label htmlFor="age" className="inline-block px-2 w-[75px]">
              Age
            </label>
            <input
              type="text"
              id="age"
              className={`border max-w-[150px] outline-none px-2 py-1 rounded-md ${
                ageError ? "border-red-500" : ""
              }`}
              ref={ageRef}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button className="px-4 py-2 bg-[#252733] rounded-md cursor-pointer hover:scale-110 transition-all duration-500 hover:text-[#c9b26c]">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Info;
