import { NavLink } from "react-router-dom";

function CalculatorsContainer({ children }) {
  //#6572aa
  return (
    <div className="flex justify-center xl:px-35 md:px-10 px-4 mt-10">
      <div className="w-full max-w-175">
        <div className="flex items-center">
          <NavLink
            to={"bmi"}
            className={({ isActive }) =>
              `px-8 py-2 rounded-t-xl hover:text-[#c9b26c] transition-color duration-500 ${
                isActive || location.pathname === "/calculator"
                  ? "bg-[#252733]"
                  : ""
              }`
            }
          >
            BMI
          </NavLink>
          <NavLink
            to={"calories"}
            className={({ isActive }) =>
              `px-8 py-2 rounded-t-xl hover:text-[#c9b26c] transition-color duration-500 ${
                isActive ? "bg-[#252733]" : ""
              }`
            }
          >
            BMR
          </NavLink>
        </div>
        <div className="bg-[#252733] p-8">{children}</div>
      </div>
    </div>
  );
}

export default CalculatorsContainer;
