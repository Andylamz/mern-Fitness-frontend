import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import SubmitBtn from "../Components/SubmitBtn";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../../../Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

function FoodInfoPage() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [portion, setPortion] = useState(100);
  const { id } = useParams();
  const { getToken } = useAuth();
  const { refresh, userMongoId } = useOutletContext();
  const navigate = useNavigate();

  const nutritionData = data
    ? [
        (data.proteins_100g / 100) * portion,
        (data.carbonhydrates_100g / 100) * portion,
        (data.fiber_100g / 100) * portion,
      ]
    : "";

  function handleNavigate(path) {
    navigate(path);
  }

  async function handleSubmitData(e) {
    e.preventDefault();
    const baseUrl = import.meta.env.VITE_BACKEND_API;
    const token = await getToken();

    try {
      const res = await axios.patch(
        `${baseUrl}/api/dashboard/dashboardInfo/logFood`,
        {
          userMongoId,
          foods: {
            id: data.id,
            productName: data.productName,
            brand: data.brand,
            total_kcal: +((data.energy_kcal_100g * portion) / 100).toFixed(1),
            total_protein: +((data.proteins_100g / 100) * portion).toFixed(1),
            total_fiber: +((data.fiber_100g * portion) / 100).toFixed(1),
            total_carbonhydrates: +(
              (data.carbonhydrates_100g * portion) /
              100
            ).toFixed(1),
            portion: +portion,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        refresh();
        navigate("/dashboard/foodlog");
        toast.success("Food Added Successfully", {
          autoClose: 800,
        });
      }
    } catch {
      toast.error("Something Went Wrong", {
        autoClose: 800,
      });
    }
  }

  //   Barchart Data
  const chartData = {
    labels: ["Protein", "Carbonhydrate", "Fiber"],
    datasets: [
      {
        label: "grams",
        data: nutritionData,
        backgroundColor: [
          "rgba(21, 255, 169, 0.2)",
          "rgba(215, 52, 244, 0.2)",
          "rgba(249, 97, 31, 0.2)",
        ],
        borderColor: [
          "rgba(21, 255, 169, 1)",
          "rgba(215, 52, 244, 1)",
          "rgba(249, 97, 31, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const fetchFoodInfo = useCallback(
    async function () {
      const baseUrl = import.meta.env.VITE_BACKEND_API;
      try {
        const res = await axios.get(`${baseUrl}/api/foodSearch/product`, {
          params: {
            id: id,
          },
        });

        if (res.data.success) {
          return setData(res.data.data);
        }
      } catch {
        return toast.error("Something Went Wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    fetchFoodInfo();
  }, [id]);

  return (
    <>
      {!isLoading && data && (
        <div className="flex flex-col w-full justify-between h-full items-center gap-10 text-[#6572aa] py-7">
          <div className="flex flex-col gap-8 w-full">
            <FontAwesomeIcon
              icon="fa-solid fa-arrow-left"
              className="text-lg cursor-pointer text-[#6572aa] ml-2"
              onClick={() => handleNavigate("/dashboard/foodlog")}
            />
            <div className="flex flex-col gap-5 h-40 items-center w-full">
              <h3 className="text-xl font-semibold">{data.productName}</h3>
              <Pie data={chartData} options={options} />
              <div className="flex flex-col text-sm gap-2">
                <div className="flex justify-center gap-5">
                  <p className="text-[#0e9cfb]">
                    energy{" "}
                    {((data.energy_kcal_100g * portion) / 100).toFixed(1)}kcal
                  </p>
                  <p className="text-[#42f1b1]">
                    protein {((data.proteins_100g / 100) * portion).toFixed(1)}g
                  </p>
                </div>
                <div className="flex justify-center gap-5">
                  <p className="text-[#d734f4]">
                    carbonhydrate{" "}
                    {((data.carbonhydrates_100g * portion) / 100).toFixed(1)}g
                  </p>
                  <p className="text-[#f9611f]">
                    fiber {((data.fiber_100g * portion) / 100).toFixed(1)}g
                  </p>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  className="w-full border py-2 text-center outline-none rounded-md mt-5"
                  placeholder="grams"
                  onChange={(e) => setPortion(+e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-full px-12">
            <button
              className="py-3 bg-[#151824] w-full hover:bg-[#c9b26c] cursor-pointer duration-500 rounded-md"
              onClick={handleSubmitData}
            >
              Log Food
            </button>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex flex-col w-full justify-center h-full items-center gap-10 text-[#6572aa] py-7">
          <Loading message="Fetching Food Info" />
        </div>
      )}
    </>
  );
}

export default FoodInfoPage;
