function BmiOutput({ weight, height }) {
  const bmi = +(weight / (height / 100) ** 2).toFixed(1);

  return (
    <div className="mt-15">
      {!bmi && <h3 className="text-xl font-semibold mb-6">BMI CATEGORIES</h3>}
      {height && weight && (
        <div className="flex flex-col text-xl font-semibold">
          <h3>Your BMI is:</h3>
          <p>{bmi}</p>
        </div>
      )}
      <div className="flex flex-col my-3 max-sm:text-sm text-lg">
        <div className={`flex justify-start border border-b-0 px-6 py-4`}>
          <p className="flex-1 max-w-85 ">BMI Categories</p>
          <p>BMI Range</p>
        </div>
        <div
          className={`flex justify-start border border-b-0 px-6 py-4 ${
            bmi && bmi < 18.5 ? "bg-[#151824]" : ""
          }`}
        >
          <p className="flex-1 max-w-85 ">Underweight</p>
          <p>Below 18.5</p>
        </div>
        <div
          className={`flex justify-start border border-b-0 px-6 py-4 ${
            bmi && bmi >= 18.5 && bmi <= 24.9 ? "bg-[#151824]" : ""
          }`}
        >
          <p className="flex-1 max-w-85 ">Healthy</p>
          <p>18.5 – 24.9</p>
        </div>
        <div
          className={`flex justify-start border border-b-0 px-6 py-4 ${
            bmi && bmi >= 25 && bmi <= 29.9 ? "bg-[#151824]" : ""
          }`}
        >
          <p className="flex-1 max-w-85 ">Overweight</p>
          <p>25.0 – 29.9</p>
        </div>
        <div
          className={`flex justify-start border px-6 py-4 ${
            bmi && bmi >= 30 ? "bg-[#151824]" : ""
          }`}
        >
          <p className="flex-1 max-w-85 ">Obesity</p>
          <p>30.0 or above</p>
        </div>
      </div>
    </div>
  );
}

export default BmiOutput;
