import React from "react";
import Loading from "../../Loading";

export default function CaloriesOverview({ todayData, todayDataIsLoading }) {
  const totalIntakeKcal = todayData
    ? todayData?.foods
        ?.reduce((curr, next) => curr + next.total_kcal, 0)
        .toFixed(0)
    : 0;

  const goal = (todayData?.weight * 30).toFixed(0) - 300;
  return (
    <>
      {todayData && !todayDataIsLoading && (
        <div className="text-[#6572aa]  w-full  lg:max-w-90 rounded-lg text-center px-5 py-5">
          <p className="text-xl font-semibold">Calories</p>
          <div className="flex flex-col gap-3 mt-5 max-lg:text-sm">
            <div className="flex text-red-500 justify-between">
              <p>Goal</p>
              <div className="flex gap-2">
                <p>{goal}</p>kcal
              </div>
            </div>
            <div className="flex text-sky-500 justify-between">
              <p>Calories Intake</p>
              <div className="flex gap-2">
                <p>{totalIntakeKcal}</p>
                kcal
              </div>
            </div>
            <div className="flex justify-between">
              <p>Remaing Calories</p>
              <div className="flex gap-2">
                <p>{goal - totalIntakeKcal}</p>kcal
              </div>
            </div>
          </div>
        </div>
      )}
      {todayDataIsLoading && (
        <div className="flex justify-center items-center h-[200px] pl-8 text-[#6572aa]">
          <Loading message="Fetching Calories Data" />
        </div>
      )}
    </>
  );
}
