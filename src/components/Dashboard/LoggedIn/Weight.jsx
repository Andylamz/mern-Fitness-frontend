import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Loading from "../../Loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Weight({ data, dataIsLoading }) {
  const weight = data ? data?.map((dashboard) => dashboard.weight) : [];
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

  const lineChartData =
    weight && dates
      ? {
          labels: dates,
          datasets: [
            {
              label: "weight in kg",
              data: weight,
              borderColor: "#ff3939",
              tension: 0.4,
              fill: true,
              backgroundColor: "rgba(255, 57, 57, 0.1)",
            },
          ],
        }
      : {};

  const options =
    weight && dates
      ? {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              min: Math.min(...weight) - 1,
              max: Math.max(...weight) + 1,
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
        }
      : {};
  return (
    <div className="w-full lg:max-w-90 bg-[#252733] border-top pt-0.5 rounded-lg h-70 text-[#6572aa] hover:scale-105 duration-500">
      {weight && dates && (
        <div className="h-full flex flex-col justify-center px-5">
          <div className="flex justify-start py-2 text-[#c9b26c]">
            Weight Tracker
          </div>
          <div className="h-50 pt-7">
            <Line options={options} data={lineChartData} />
          </div>
        </div>
      )}
      {dataIsLoading && (
        <div className="flex h-full w-full justify-center items-center text-[#6572aa]">
          <Loading message="Fetching Weight Data" />
        </div>
      )}
    </div>
  );
}

export default Weight;
