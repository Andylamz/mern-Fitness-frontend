import { useRef, useState } from "react";

function BmiInput({ setWeight, setHeight }) {
  const weightRef = useRef();
  const heightRef = useRef();
  const [weightError, setWeightError] = useState(false);
  const [heightError, setHeightError] = useState(false);

  function handleClearData() {
    weightRef.current.value = "";
    heightRef.current.value = "";
    setHeight("");
    setWeight("");
    setHeightError(false);
    setWeightError(false);
  }

  function handleSubmitData() {
    const weight = weightRef.current.value;
    const height = heightRef.current.value;
    if (!/^\d*\.?\d*$/.test(weight) || weight.trim() === "") {
      setWeightError(true);
    }
    if (!/^\d*\.?\d*$/.test(height) || height.trim() === "") {
      setHeightError(true);
    }
    if (
      !/^\d*\.?\d*$/.test(weight) ||
      !/^\d*\.?\d*$/.test(height) ||
      weight.trim() === "" ||
      height.trim() === ""
    ) {
      return null;
    }
    setWeight(weight);
    setHeight(height);
    weightRef.current.value = "";
    heightRef.current.value = "";
    setHeightError(false);
    setWeightError(false);
  }

  return (
    <div>
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
              className={`flex-1 border ${
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
              className={`flex-1 border ${
                weightError ? "border-red-500" : ""
              } outline-none px-2 py-2 rounded-sm min-w-0`}
              ref={weightRef}
              placeholder="Kilometers"
            />
          </div>
        </div>
      </div>
      <div className="flex text-[#6572aa] gap-5 ">
        <button
          className="mt-5 px-5 py-2 rounded-sm bg-[#151824] cursor-pointer max-sm:text-sm"
          onClick={handleSubmitData}
        >
          Calculate BMI
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

export default BmiInput;
