function BmrOutput({ weight, height, age, gender }) {
  const maleBmr = (10 * weight + 6.25 * height - 5 * age + 5).toFixed(2);
  const femaleBmr = (10 * weight + 6.25 * height - 5 * age - 161).toFixed(2);
  const Bmr = gender === "male" ? maleBmr : femaleBmr;
  return (
    <>
      {gender && height && age && weight ? (
        <div className="flex-1 mt-8 px-2 py-4 text-center bg-[#151824] text-[#c9b26c]">
          <p>Your BMR is : {Bmr} Kcal/day</p>
        </div>
      ) : null}
    </>
  );
}

export default BmrOutput;
