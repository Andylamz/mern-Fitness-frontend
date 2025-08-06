import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import logo from "../assets/app_logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
  return (
    <div className="flex justify-end xl:px-35 md:px-10 px-4 text-white w-full max-h-40">
      <div className="flex justify-between w-[50%] py-5 items-center">
        <Link to={"/"} className="h-full -translate-x-[50%]">
          <img className=" h-full" src={logo} />
        </Link>
        <div>
          <SignedOut>
            <Link to="/sign-in">
              <FontAwesomeIcon
                icon="fa-solid fa-circle-user"
                size="2xl"
                className="text-[#6572aa] hover:text-[#c9b26c] transition-colors duration-500"
              />
            </Link>
          </SignedOut>
          {/* --------------------------------------------- */}
          <SignedIn>{"To be filled"}</SignedIn>
        </div>
      </div>
    </div>
  );
}

export default Header;
