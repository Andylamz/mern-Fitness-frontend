import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Loading from "../../Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  cutout: "80%",
  radius: "90%",
  plugins: {
    legend: {
      display: false,
    },
  },
};

function Macros({ todayData, todayDataIsLoading }) {
  console.log(todayData);
  const protein = todayData
    ? todayData.foods.reduce((acc, next) => acc + next.total_protein, 0)
    : 0;
  const carbonhydrate = todayData
    ? todayData.foods.reduce((acc, next) => acc + next.total_carbonhydrates, 0)
    : 0;
  const fiber = todayData
    ? todayData.foods.reduce((acc, next) => acc + next.total_fiber, 0)
    : 0;

  //   const barchartData = todayData
  //     ? {
  //         labels: ["Protein", "Carbs", "Fiber"],
  //         datasets: [
  //           {
  //             label: "steps",
  //             data: [protein, carbonhydrate, fiber],
  //             backgroundColor: ["#42f1b1", "#d734f4", "#f9611f"],
  //             borderColor: "pink",
  //             hoverBackgroundColor: "pink",
  //             barThickness: 20,
  //             barPercentage: 0.4,
  //             categoryPercentage: 0.5,
  //           },
  //         ],
  //       }
  //     : {};
  const proteinData = todayData
    ? {
        labels: ["Protein", "Remaining"],
        datasets: [
          {
            label: "grams",
            data: [protein, (1.6 * protein - protein).toFixed(0)],
            backgroundColor: ["#42f1b1", "#0f1424"],
            barThickness: 20,
            borderWidth: 0,
            categoryPercentage: 0.5,
          },
        ],
      }
    : {};

  const carbsData = todayData
    ? {
        labels: ["carbs", "Remaining"],
        datasets: [
          {
            label: "grams",
            data: [
              carbonhydrate,
              (3 * todayData.weight - carbonhydrate).toFixed(0),
            ],
            backgroundColor: ["#d734f4", "#0f1424"],
            barThickness: 20,
            borderWidth: 0,
            categoryPercentage: 0.5,
          },
        ],
      }
    : {};

  const fiberData = todayData
    ? {
        labels: ["Fiber", "Remaining"],
        datasets: [
          {
            label: "grams",
            data: [fiber, (0.3 * todayData.weight - fiber).toFixed(0)],
            backgroundColor: ["#f9611f", "#0f1424"],
            barThickness: 20,
            borderWidth: 0,
            categoryPercentage: 0.5,
          },
        ],
      }
    : {};
  return (
    <div className="min-w-80 max-w-90 bg-[#252733] border-top pt-0.5 rounded-lg h-70 text-[#6572aa] hover:scale-105 duration-500">
      <>
        {todayData && !todayDataIsLoading && (
          <>
            <div className="ml-5 mt-4 flex justify-start py-2 text-[#c9b26c]">
              Macros
            </div>

            <div className="flex flex-col justify-center px-5 mt-4">
              <div className="flex justify-between">
                <div className="flex flex-col gap-4 w-20 pt-7 text-center">
                  <Doughnut data={proteinData} options={options} />
                  <h4 className="text-[#42f1b1]">Protein</h4>
                </div>
                <div className="flex flex-col gap-4 w-20 pt-7 text-center">
                  <Doughnut data={carbsData} options={options} />
                  <h4 className="text-[#d734f4]">Carbs</h4>
                </div>
                <div className="flex flex-col gap-4 w-20 pt-7 text-center">
                  <Doughnut data={fiberData} options={options} />
                  <h4 className="text-[#f9611f]">Fiber</h4>
                </div>
              </div>
            </div>
          </>
        )}
        {todayDataIsLoading && (
          <div className="flex h-full w-full justify-center items-center">
            <Loading message="Fetching Macros Data" />
          </div>
        )}
      </>
    </div>
  );
}

export default Macros;
