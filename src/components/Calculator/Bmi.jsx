import { useState } from "react";
import BmiInput from "./bmi/BmiInput";
import BmiOutput from "./bmi/BmiOutput";

function Bmi() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <div className="">
      <h3 className="text-2xl uppercase font-semibold text-[#c9b26c]">
        BMI Calculator
      </h3>
      <BmiInput setHeight={setHeight} setWeight={setWeight} />
      <BmiOutput height={height} weight={weight} />
      <p className="mt-18">
        Body mass index (BMI) is a measure of body fat based on height and
        weight that applies to adult men and women. Your BMI is just one piece
        of the puzzle. It’s based on height and weight but doesn’t take into
        account your muscle mass, bone density, or body composition. Your
        healthcare provider will consider whether your BMI is too high or too
        low for you.
      </p>
    </div>
  );
}

export default Bmi;
