import { useParams } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = import.meta.env.VITE_BACKEND_API;

function RecipeInfo() {
  const [data, setData] = useState("");
  const { id } = useParams();

  async function fetchData() {
    try {
      const res = await axios.get(`${baseUrl}/api/recipeSearch/recipes/${id}`);
      console.log(res.data);
      if (res.data.success) {
        console.log("set", res.data.data);
        setData(res.data.data);
      }
    } catch {
      return null;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data && (
        <div className="text-[#6572aa] mb-30">
          <Header />
          <div className="border mt-45 border-[#c9b26c]"></div>
          <div className="xl:px-35 md:px-10 px-4">
            <div className="flex justify-center -translate-y-[30%]">
              <img
                src={data.image}
                alt={data.title}
                // className="max-w-[312px] w-full max-h-[207px]"
              />
            </div>
            <div className="flex flex-col items-center -translate-y-[50px]">
              <h3 className="text-3xl text-center  font-semibold">
                {data.title}
              </h3>
              <div className="flex flex-col gap-2 items-center p-10 rounded-2xl font-extrabold bg-[#252733] text-[#c9b26c] mt-8 mb-4">
                <h3 className="text-2xl">Ready In</h3>
                <p>{data.readyInMinutes} mins</p>
              </div>
              <div className="flex flex-col gap-2 w-full max-w-[600px]">
                <h4 className="text-xl mt-5 mb-3 font-semibold">Ingredients</h4>
                <div className="flex flex-col gap-2 pl-4">
                  {data.extendedIngredients.map((item, index) => {
                    return <p key={index}>{item.original}</p>;
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full max-w-[600px]">
                <h4 className="text-xl mt-5 mb-3 font-semibold">Preparation</h4>
                <div className="flex flex-col gap-4 pl-4">
                  {data.instructions
                    .split("<li>")
                    .join("")
                    .split("</li>")
                    .slice(1, -1)
                    .map((step, index) => {
                      return (
                        <p key={index}>
                          {index + 1}. {step}
                        </p>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeInfo;
