import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import CalculatorsContainer from "../components/Calculator/CalculatorsContainer";

function Calculator() {
  return (
    <div className="min-h-screen text-[#6572aa] mb-30">
      <Header />
      <CalculatorsContainer>
        <Outlet />
      </CalculatorsContainer>
    </div>
  );
}

export default Calculator;
