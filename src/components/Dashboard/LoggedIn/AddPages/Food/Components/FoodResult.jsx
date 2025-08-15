import { Link } from "react-router-dom";

function FoodResult({ brand, productName, nutriments, id }) {
  return (
    <Link
      to={`/dashboard/searchFood/${id}`}
      className="flex flex-col gap-1 rounded-md bg-[#151824] py-2 px-2"
    >
      <div className="flex gap-1">
        <p className=" line-clamp-1">
          {productName}, {brand}
        </p>
      </div>
      <div className="flex gap-2 text-xs">
        {nutriments["energy_kcal_100g"] ? (
          <p>{+nutriments["energy_kcal_100g"].toFixed(2)} kcal</p>
        ) : (
          ""
        )}
        {nutriments["proteins_100g"] ? (
          <p>{+nutriments["proteins_100g"].toFixed(2)}g protein</p>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}

export default FoodResult;
