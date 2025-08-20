import React from "react";
import CaloriesOverview from "./CaloriesOverview";
import ExerciseOverview from "./ExerciseOverview";
import Weather from "./Weather";
import Hydration from "./Hydration";

export default function Overview({ firstName, todayData, todayDataIsLoading }) {
  return (
    <>
      <div className="rounded-md p-5 md:pb-1 text-[#c9b26c] bg-[#252733] pb-8 ">
        <div className="flex justify-between">
          <p className=" font-semibold text-3xl">Overview</p>
          <p className="text-lg mr-2">Hi, {firstName}</p>
        </div>
        <div className="flex h-full justify-between mt-4 px-20 max-lg:justify-center max-lg:px-10 flex-col md:flex-row sm:gap-5 md:gap-20 xl:gap-0">
          <CaloriesOverview
            todayData={todayData}
            todayDataIsLoading={todayDataIsLoading}
          />
          <ExerciseOverview
            todayData={todayData}
            todayDataIsLoading={todayDataIsLoading}
          />
          <Hydration
            type="overview"
            todayData={todayData}
            todayDataIsLoading={todayDataIsLoading}
          />
        </div>
      </div>
    </>
  );
}
