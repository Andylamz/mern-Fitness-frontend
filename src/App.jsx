import { RouterProvider } from "react-router-dom";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

function App() {
  return (
    //xl:px-35 md:px-10 px-4
    <div className="flex flex-col min-h-screen bg-[#151824] text-white">
      {/* <Header /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
