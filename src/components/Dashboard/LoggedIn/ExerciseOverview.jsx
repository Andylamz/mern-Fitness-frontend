import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Loading from "../../Loading";

export default function ExerciseOverview({ todayData, todayDataIsLoading }) {
  const exerciseBurn = todayData ? todayData.exerciseBurn : 0;
  const steps = todayData ? todayData.steps : 0;
  return (
    <>
      {!todayDataIsLoading && todayData && (
        <div className="text-[#6572aa] w-full max-w-90 rounded-lg text-center px-5 py-5">
          <p className="text-xl font-semibold">Exercise</p>
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex justify-between">
              <div className="flex gap-2 text-orange-500">
                <FontAwesomeIcon
                  icon="fa-solid fa-shoe-prints"
                  rotation={270}
                  className="text-lg "
                />
                Steps
              </div>
              <div className="flex w-22 justify-between text-orange-500 gap-2">
                <p>{steps}</p>
                <p>steps</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 text-blue-500">
                <FontAwesomeIcon
                  icon="fa-solid fa-football"
                  rotation={270}
                  className="text-lg "
                />
                Exercise
              </div>
              <div className="flex w-22 justify-between text-blue-500 gap-2">
                <p>{exerciseBurn}</p>
                <p>kcal</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {todayDataIsLoading && (
        <div className="flex justify-center items-center h-[200px] text-[#6572aa]">
          <Loading message="Fetching Exercise Data" />
        </div>
      )}
    </>
  );
}
