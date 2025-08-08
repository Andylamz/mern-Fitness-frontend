import { useUser } from "@clerk/clerk-react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Info from "../components/Dashboard/Info";
import Loading from "../components/Loading";

function Dashboard() {
  const user = useUser();
  const firstName = user?.user?.firstName;
  const personalData = user?.user?.publicMetadata.personalData;
  const { isLoaded, isSignedIn } = user;
  const navigate = useNavigate();

  console.log(user);

  // Authentication - if not logged in, redirect to login page
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in");
    }
  }, [navigate, isLoaded, isSignedIn]);

  if (isLoaded && !isSignedIn) {
    return null;
  }

  return (
    <div>
      <Header />
      {user.isSignedIn && user.user && (
        <div className="xl:px-35 md:px-10 px-4">Hi {firstName}</div>
      )}
      {isLoaded && isSignedIn && !personalData && <Info />}
    </div>
  );
}

export default Dashboard;
