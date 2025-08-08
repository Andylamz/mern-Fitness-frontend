import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import CalculatorsContainer from "../components/Calculator/CalculatorsContainer";
import { useUser } from "@clerk/clerk-react";

function Calculator() {
  const user = useUser();
  console.log(user);
  return (
    <div className="min-h-screen text-[#6572aa] mb-30">
      <Header />
      {/* mt-10 */}
      <CalculatorsContainer>
        <Outlet />
      </CalculatorsContainer>
    </div>
  );
}

export default Calculator;
