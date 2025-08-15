import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "80%",
  radius: "90%",
  plugins: {
    legend: {
      display: false,
    },
  },
};

function Calories({ todayData, todayDataIsLoading }) {
  const totalIntakeKcal = todayData
    ? todayData?.foods
        ?.reduce((curr, next) => curr + next.total_kcal, 0)
        .toFixed(0)
    : 0;

  const goal = (todayData?.weight * 30).toFixed(0) - 300;

  const data = {
    labels: ["Calories Intake", "Remaining"],
    datasets: [
      {
        data: [totalIntakeKcal, goal - totalIntakeKcal],
        backgroundColor: ["rgb(54, 162, 235)", "#151824"],
        barWidth: 1,
        borderWidth: 0,
      },
    ],
  };

  return (
    <>
      {!todayDataIsLoading && todayData && (
        <div className="text-[#6572aa] bg-[#252733] w-full max-w-90 rounded-lg text-center px-5 py-5 h-70 hover:scale-105 transition-all duration-500">
          <div className="flex justify-start py-2 text-[#c9b26c]">Calories</div>
          <div className="flex justify-between h-50">
            <div className="flex-2 min-w-0">
              <Doughnut data={data} options={doughnutOptions} />
            </div>
            <div className="flex flex-1 flex-col text-xs py-8 gap-3">
              <div className="text-red-500">
                <p>Goal</p>
                <p>{goal} kcal</p>
              </div>
              <div className="text-sky-500">
                <p>Intake</p>
                <p>{totalIntakeKcal} kcal</p>
              </div>
              <div>
                <p>Remaining</p>
                <p>{goal - totalIntakeKcal} kcal</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {todayDataIsLoading && (
        <div className="flex w-full justify-center items-center text-[#6572aa] bg-[#252733] min-w-80  max-w-90 rounded-lg text-center px-5 py-5 h-70 hover:scale-105 transition-all duration-500">
          <Loading message="Fetching Calories Data" />
        </div>
      )}
    </>
  );
}

export default Calories;
