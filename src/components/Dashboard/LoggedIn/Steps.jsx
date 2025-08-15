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

function Steps({ data, dataIsLoading }) {
  const steps = data ? data?.map((dashboard) => dashboard.steps) : "";
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
    steps && dates
      ? {
          labels: dates,
          datasets: [
            {
              label: "steps",
              data: steps,
              backgroundColor: "#ff4d00",
              borderColor: "pink",
              hoverBackgroundColor: "pink",
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
        {steps && dates && (
          <div className="h-full flex flex-col justify-center px-5">
            <div className="flex justify-start py-2 text-[#c9b26c]">Steps</div>
            <div className="h-50 pt-7">
              <Bar options={options} data={barchartData} />
            </div>
          </div>
        )}
        {dataIsLoading && (
          <div className="flex h-full w-full justify-center items-center">
            <Loading message="Fetching Steps Data" />
          </div>
        )}
      </>
    </div>
  );
}

export default Steps;
