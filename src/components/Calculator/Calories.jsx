import { useState } from "react";
import BmrInput from "./bmr/BmrInput";
import BmrOutput from "./bmr/BmrOutput";

function Calories() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  return (
    <div>
      <h3 className="text-2xl uppercase font-semibold text-[#c9b26c]">
        BMR calculator
      </h3>
      <BmrInput
        setAge={setAge}
        gender={gender}
        setGender={setGender}
        setWeight={setWeight}
        setHeight={setHeight}
      />
      <BmrOutput weight={weight} height={height} gender={gender} age={age} />
    </div>
  );
}

export default Calories;
