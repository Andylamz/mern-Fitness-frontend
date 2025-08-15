import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../../Loading";
import FoodResult from "./Components/FoodResult";

function SearchFoodPage() {
  const [data, setData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const navigate = useNavigate();

  function handleNavigate(path) {
    navigate(path);
  }

  function handleOnChange(e) {
    setSearchTerm(e.target.value);
  }

  async function handleFetchData(e) {
    e.preventDefault();
    setData("");
    setIsFetched(false);
    const baseUrl = import.meta.env.VITE_BACKEND_API;
    try {
      setIsLoading(true);
      const res = await axios.get(`${baseUrl}/api/foodSearch`, {
        params: {
          name: searchTerm,
        },
      });

      if (res.data.success) {
        return setData(res.data.data);
      }
    } catch {
      setData(null);
      return toast.error("Failed To Fetch Data");
    } finally {
      setIsLoading(false);
      setIsFetched(true);
    }
  }

  return (
    <div className="py-5 h-full">
      <div className="flex flex-col gap-5 px-2 h-full">
        <div className="">
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-left"
            className="text-lg cursor-pointer text-[#6572aa]"
            onClick={() => handleNavigate("/dashboard/foodlog")}
          />
        </div>
        <form onSubmit={handleFetchData}>
          <input
            type="text"
            className="border border-[#6572aa] w-full p-2 rounded-md outline-none text-[#6572aa]"
            onChange={handleOnChange}
          />
        </form>
        <div className="flex flex-1  text-[#6572aa] hide-scrollbar overflow-y-auto">
          <div className="flex justify-center items-center w-full h-full">
            <div className="text-center">
              {!isLoading && !data && !isFetched && <p>Start Your Search</p>}
              {!isLoading && data.length === 0 && isFetched && (
                <p>No Data Found</p>
              )}
              {isLoading && <Loading message="Fetching Data" />}
            </div>
            {isFetched && !isLoading && data && data.length > 0 && (
              <div className="flex flex-col w-full max-h-full gap-2">
                {data.map((food) => (
                  <FoodResult
                    key={food.id}
                    brand={food.brand}
                    productName={food.productName}
                    nutriments={food.nutriments}
                    id={food.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFoodPage;
