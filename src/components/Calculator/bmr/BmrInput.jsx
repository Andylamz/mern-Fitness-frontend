import { useRef, useState } from "react";

function BmrInput({ setAge, gender, setGender, setWeight, setHeight }) {
  const [weightError, setWeightError] = useState(false);
  const [heightError, setHeightError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const heightRef = useRef();
  const weightRef = useRef();
  const ageRef = useRef();

  function onChange(e) {
    setGender(e.target.value);
  }

  function handleSubmitData() {
    const weight = weightRef.current.value;
    const height = heightRef.current.value;
    const age = ageRef.current.value;

    // Validation
    if (!/^\d*$/.test(age) || weight.trim() === "") {
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
    if (!gender) {
      setGenderError(true);
    } else {
      setGenderError(false);
    }
    if (
      !/^\d*\.?\d*$/.test(weight) ||
      !/^\d*\.?\d*$/.test(height) ||
      weight.trim() === "" ||
      height.trim() === "" ||
      age.trim() === ""
    ) {
      return null;
    }

    setWeight(+weight);
    setHeight(+height);
    setAge(+age);
    weightRef.current.value = "";
    heightRef.current.value = "";
    ageRef.current.value = "";
    setGender(gender);
    setHeightError(false);
    setAgeError(false);
    setWeightError(false);
    setGenderError(false);
  }

  function handleClearData() {
    weightRef.current.value = "";
    heightRef.current.value = "";
    ageRef.current.value = "";
    setGender("");
    setWeight("");
    setAge("");
    setHeight("");
    setHeightError(false);
    setAgeError(false);
    setWeightError(false);
    setGenderError(false);
  }

  return (
    <div className="mt-8">
      {/* upper part */}
      <div className="flex gap-5 sm:items-center ">
        {/* Gender */}
        <div className="flex-1 max-w-[308px]">
          <h3
            className={`sm:text-xl text-lg mb-2 font-semibold ${
              genderError ? "text-red-500" : ""
            }`}
          >
            Gender:
          </h3>
          <div className="flex sm:gap-8 gap-2 sm:flex-row flex-col">
            <div className="flex gap-3">
              <input
                type="radio"
                id="male"
                value="male"
                name="gender"
                className="accent-[#c9b26c] w-4"
                onChange={onChange}
              />
              <label htmlFor="male" className="sm:text-lg text-base">
                Male
              </label>
            </div>
            <div className="flex gap-3">
              <input
                type="radio"
                id="female"
                value="female"
                name="gender"
                className="accent-[#c9b26c] w-4"
                onChange={onChange}
              />
              <label htmlFor="female" className="sm:text-lg text-base">
                Female
              </label>
            </div>
          </div>
        </div>

        {/* Age */}
        <div className="flex flex-1 flex-col min-w-0 gap-2  ">
          <h3 className="sm:text-xl text-lg font-semibold">Age</h3>
          <input
            type="text"
            className={`border flex-1 min-w-0 p-2 rounded-sm max-h-[42px] focus:border-[#c9b26c] outline-none ${
              ageError ? "border-red-500" : ""
            }`}
            placeholder="Years"
            ref={ageRef}
          />
        </div>
      </div>
      {/* lower part */}
      <div className="flex justify-center mt-8 gap-5">
        <div className="flex-1 min-w-0">
          <label
            className="text-xl font-semibold max-sm:text-lg"
            htmlFor="height"
          >
            Height
          </label>
          <div className="flex items-center mt-3 flex-1 min-w-0">
            <input
              type="text"
              id="height"
              className={`flex-1 border focus:border-[#c9b26c] ${
                heightError ? "border-red-500" : ""
              } outline-none px-2 py-2 rounded-sm min-w-0`}
              ref={heightRef}
              placeholder="Centimeters"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <label
            className="text-xl font-semibold max-sm:text-lg"
            htmlFor="weight"
          >
            Weight
          </label>
          <div className="mt-3 flex items-center flex-1">
            <input
              type="text"
              id="weight"
              className={`flex-1 border focus:border-[#c9b26c] ${
                weightError ? "border-red-500" : ""
              } outline-none px-2 py-2 rounded-sm min-w-0`}
              ref={weightRef}
              placeholder="Kilometers"
            />
          </div>
        </div>
      </div>
      <div className="flex text-[#6572aa] gap-5">
        <button
          className="mt-5 px-5 py-2 rounded-sm bg-[#151824] cursor-pointer max-sm:text-sm"
          onClick={handleSubmitData}
        >
          Calculate BMR
        </button>
        <button
          className="mt-5 px-5 py-2 rounded-sm bg-[#151824] cursor-pointer max-sm:text-sm"
          onClick={handleClearData}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default BmrInput;
