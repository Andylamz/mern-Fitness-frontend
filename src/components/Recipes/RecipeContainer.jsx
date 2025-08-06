import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { toast } from "react-toastify";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_API;
console.log(baseUrl);

function RecipeContainer() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchRecipesData() {
    try {
      const res = await axios.get(`${baseUrl}/api/recipeSearch`);
      setData(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      return toast.error(err.message);
    }
  }
  useEffect(() => {
    setIsLoading(true);
    fetchRecipesData();
    setIsLoading(false);
  }, []);

  return (
    <div className="xl:px-35 md:px-10 px-4 mt-13 mb-30">
      {data && !isLoading && (
        <div className="flex w-full flex-wrap justify-center gap-10">
          {data?.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              image={recipe.image}
              title={recipe.title}
            />
          ))}
        </div>
      )}
      {isLoading && !data && <div>Loading...</div>}
    </div>
  );
}

export default RecipeContainer;
