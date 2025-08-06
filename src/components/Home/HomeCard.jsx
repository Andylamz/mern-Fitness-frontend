import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HomeCard({ icon, text }) {
  // receive three things: url, icon, text
  return (
    <div className="flex justify-center items-center w-full bg-[#6572aa] rounded-md cursor-pointer hover:scale-105 hover:bg-[#c9b26c] transition-all duration-800">
      <div className="flex flex-col justify-center items-center gap-5 py-15 text-[#151824]">
        <FontAwesomeIcon icon={`fa-solid fa-${icon}`} className="text-4xl" />
        <p className="text-lg">{text}</p>
      </div>
    </div>
  );
}

export default HomeCard;
