import { useAuth, useUser } from "@clerk/clerk-react";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Info from "../components/Dashboard/Info";
import Loading from "../components/Loading";
import Overview from "../components/Dashboard/LoggedIn/Overview";
import axios from "axios";
import Weather from "../components/Dashboard/LoggedIn/Weather";
import Calories from "../components/Dashboard/LoggedIn/Calories";
import Steps from "../components/Dashboard/LoggedIn/Steps";
import DashboardAddContainer from "../components/Dashboard/LoggedIn/DashboardAddContainer";
import Exercise from "../components/Dashboard/LoggedIn/Exercise";
import Weight from "../components/Dashboard/LoggedIn/Weight";
import Macros from "../components/Dashboard/LoggedIn/Macros";

function Dashboard() {
  const [isFetched, setIsFetched] = useState(false);
  const [data, setData] = useState("");
  const [todayData, setTodayData] = useState("");
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [todayDataIsLoading, setTodayDataIsLoading] = useState(true);
  const user = useUser();
  const userMongoId = user?.user?.publicMetadata?.mongoId;
  const { getToken } = useAuth();
  const firstName = user?.user?.firstName;
  const personalData = user?.user?.publicMetadata.personalData;
  const { isLoaded, isSignedIn } = user;
  const navigate = useNavigate();

  // Authentication - if not logged in, redirect to login page
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in");
      return null;
    }
  }, [navigate, isLoaded, isSignedIn]);

  const fetchBackendData = useCallback(
    async function () {
      const baseUrl = import.meta.env.VITE_BACKEND_API;
      const token = await getToken();

      try {
        const res = await axios.get(
          `${baseUrl}/api/dashboard/dashboardInfo/pastDays`,
          {
            params: { userMongoId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setData(res.data.data);
        }
      } catch {
        console.log("Failed to connect");
      } finally {
        setDataIsLoading(false);
      }
    },
    [getToken, userMongoId]
  );

  const fetchTodayData = useCallback(
    async function () {
      const baseUrl = import.meta.env.VITE_BACKEND_API;
      const token = await getToken();
      try {
        const res = await axios.get(
          `${baseUrl}/api/dashboard/dashboardInfo/today`,
          {
            params: { userMongoId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setTodayData(res.data.data);
        }
      } catch {
        console.log("Failed to connect");
      } finally {
        setTodayDataIsLoading(false);
      }
    },
    [getToken, userMongoId]
  );

  // fetching backend data
  useEffect(() => {
    if (userMongoId && !data && !isFetched) {
      fetchBackendData();
      fetchTodayData();
      setIsFetched(true);
    }
  }, [data, isFetched, userMongoId, fetchBackendData, fetchTodayData]);

  function refresh() {
    fetchBackendData();
    fetchTodayData();
  }

  if (isLoaded && !isSignedIn) {
    return null;
  }

  return (
    <div>
      <Header />
      {user.isSignedIn && user.user && (
        <div className="xl:px-40 md:px-10 px-4 mb-50 mt-10 lg:block hidden">
          <Overview
            firstName={firstName}
            todayData={todayData}
            todayDataIsLoading={todayDataIsLoading}
          />
          <div className="grid grid-cols-4 grid-rows-2 mt-6 max-h-160 gap-5">
            <Weather getToken={getToken} />
            <Calories
              todayData={todayData}
              todayDataIsLoading={todayDataIsLoading}
            />
            <Steps data={data} dataIsLoading={dataIsLoading} />
            <DashboardAddContainer>
              <Outlet
                context={{
                  refresh: refresh,
                  userMongoId: userMongoId,
                  todayData,
                  todayDataIsLoading,
                }}
              />
            </DashboardAddContainer>
            <Exercise data={data} dataIsLoading={dataIsLoading} />
            <Macros
              todayData={todayData}
              todayDataIsLoading={todayDataIsLoading}
            />
            <Weight data={data} dataIsLoading={dataIsLoading} />
          </div>
        </div>
      )}

      {isLoaded && isSignedIn && !personalData && <Info />}
    </div>
  );
}

export default Dashboard;
