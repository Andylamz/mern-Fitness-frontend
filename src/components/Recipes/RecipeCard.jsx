import { Link } from "react-router-dom";

function RecipeCard({ id, image, title }) {
  return (
    <Link
      to={`/recipes/${id}`}
      className="flex flex-col bg-[#252733] w-[420px] sm:w-[400px] items-center rounded-xl overflow-hidden hover:scale-105 hover:bg-[#c9b26c] transition-all duration-800 cursor-pointer"
    >
      <img src={image} alt={title} className="w-full object-cover h-[230px]" />
      <div className="px-2 flex items-center py-4">
        <h4 className="line-clamp-1  text-center text-[#6572aa]">{title}</h4>
      </div>
    </Link>
  );
}

export default RecipeCard;
