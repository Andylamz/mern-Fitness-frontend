import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
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

function Hydration({ type = "", todayData, todayDataIsLoading }) {
  const waterIntake = todayData ? todayData.hydration : 0;

  const data = {
    labels: ["Water Intake", "Remaining"],
    datasets: [
      {
        label: "ml",
        data: [waterIntake, 2000 - waterIntake],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
        barWidth: 1,
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className={type === "overview" ? "2xl:block hidden" : ""}>
      {!todayDataIsLoading && (
        <div className="flex justify-center text-[#6572aa] w-full  lg:max-w-90 rounded-lg text-center px-5 py-5">
          <div className="w-full">
            <h3 className="text-xl font-semibold mb-3">Hydration</h3>
            <div className="flex justify-center gap-10 h-50">
              <div className="flex flex-col justify-center text-xs gap-3">
                <div className="text-[#36a2eb]">
                  <p>intake</p>
                  <p>{todayData ? todayData.hydration : 0}</p>
                </div>

                <div className="text-[#ff6384]">
                  <p>remaining</p>
                  <p>{2000 - waterIntake}</p>
                </div>
              </div>
              <div className="w-30 ">
                <Doughnut data={data} options={doughnutOptions} />
              </div>
            </div>
          </div>
        </div>
      )}
      {todayDataIsLoading && (
        <div className="flex h-full w-full justify-center items-center  min-w-80  lg:max-w-90 text-[#6572aa]">
          <Loading message="Fetching Hydration Data" />
        </div>
      )}
    </div>
  );
}

export default Hydration;
