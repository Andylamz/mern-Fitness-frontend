import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import Loading from "../../Loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      grid: {
        color: "transparent",
      },
      ticks: {
        color: "#6572aa",
      },
    },
    x: {
      grid: {
        color: "transparent",
      },
      ticks: {
        color: "#6572aa",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

function Exercise({ data, dataIsLoading }) {
  const exerciseTime = data ? data?.map((dashboard) => dashboard.exercise) : "";
  const dates = data
    ? data?.map((dashboard) =>
        dashboard.date
          .split("T")[0]
          .split("-")
          .slice()
          .splice(1, 2)
          .reverse()
          .join("/")
      )
    : "";

  const barchartData =
    exerciseTime && dates
      ? {
          labels: dates,
          datasets: [
            {
              label: "minutes",
              data: exerciseTime,
              backgroundColor: "#2b7fff",
              //   borderColor: "pink",
              hoverBackgroundColor: "#82b4ff",
              barThickness: 20,
              barPercentage: 0.4,
              categoryPercentage: 0.5,
            },
          ],
        }
      : {};

  return (
    <div className="w-full max-w-90 bg-[#252733] border-top pt-0.5 rounded-lg h-70 text-[#6572aa] hover:scale-105 duration-500">
      <>
        {exerciseTime && dates && (
          <div className="h-full flex flex-col justify-center px-5">
            <div className="flex justify-start py-2 text-[#c9b26c]">
              Exercise Time
            </div>
            <div className="h-50 pt-7">
              <Bar options={options} data={barchartData} />
            </div>
          </div>
        )}
        {dataIsLoading && (
          <div className="flex h-full w-full justify-center items-center">
            <Loading message="Fetching Exercise Data" />
          </div>
        )}
      </>
    </div>
  );
}

export default Exercise;
