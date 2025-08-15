import { useNavigate, useOutletContext } from "react-router-dom";

function FoodLogPage() {
  const navigate = useNavigate();
  const { todayData } = useOutletContext();

  function handleNavigate(path) {
    navigate(path);
  }

  return (
    <div className="flex flex-col justify-between h-full items-center gap-10 text-[#6572aa] py-10">
      <div className="flex flex-col items-center justify-center py-2 px-3 w-full gap-12">
        <h3 className="text-xl font-semibold text-[#c9b26c]">Food Log</h3>

        {/* Food list */}
        <div className="flex flex-col gap-1 h-60 overflow-y-scroll hide-scrollbar w-full rounded-md">
          {todayData &&
            todayData.foods.length > 0 &&
            todayData.foods.map((food) => (
              <div className="flex flex-col gap-1 rounded-md bg-[#151824] py-2 px-2">
                <div className="flex gap-1">
                  <p className=" line-clamp-1">
                    {food.productName}, {food.brand}
                  </p>
                </div>
                <div className="flex gap-2 text-xs">
                  <p>{food.total_kcal} kcal</p>
                  <p>{food.total_protein} g</p>
                </div>
              </div>
            ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-2">
            <button
              className="bg-[#151824] py-4 rounded-md cursor-pointer hover:bg-[#262a3d] duration-300 flex-1"
              onClick={() => handleNavigate("/dashboard/searchFood")}
            >
              Search Food
            </button>
            <button
              className="bg-[#151824] py-4 rounded-md cursor-pointer hover:bg-[#262a3d] duration-300 flex-1"
              onClick={() => handleNavigate("/dashboard/addWater")}
            >
              Add Water
            </button>
          </div>
          <button
            className="bg-[#151824] py-4 rounded-md cursor-pointer hover:bg-[#262a3d] duration-300"
            onClick={() => handleNavigate("/dashboard")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodLogPage;
