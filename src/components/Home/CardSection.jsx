import { Link } from "react-router-dom";
import HomeCard from "./HomeCard";

function CardSection() {
  return (
    <div className="flex lg:flex-row flex-col justify-center w-full gap-10 mt-10 mb-30">
      <Link to={"/calculator"} className="w-full">
        <HomeCard text={"BMI & Calories Calculator"} icon={"calculator"} />
      </Link>
      <HomeCard text={"Healthy Recipe"} icon={"utensils"} />
      <HomeCard text={"Progress Tracker"} icon={"chart-column"} />
    </div>
  );
}

export default CardSection;
