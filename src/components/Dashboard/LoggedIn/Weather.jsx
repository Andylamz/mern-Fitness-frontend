import { useEffect, useState } from "react";
import Loading from "../../Loading";
import axios from "axios";

function Weather({ getToken }) {
  const [weather, setWeather] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fullCode = weather?.weather?.[0]?.id ?? null;
  const code = fullCode != null ? String(fullCode)[0] : null;
  let background = "";

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BACKEND_API;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const token = await getToken();
        setIsLoading(true);
        const res = await axios.get(`${baseUrl}/api/dashboard/weather`, {
          params: {
            lon: position.coords.longitude,
            lat: position.coords.latitude,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setWeather(res.data.data);
        }
        setIsLoading(false);
      },
      (err) => {
        console.log(err.message);
        setIsLoading(false);
      }
    );
  }, [getToken]);

  if (code === "2") {
    background === "bg-[url('/src/assets/weather/thunder.jpg')]";
  } else if (code === "3" || code === "5") {
    background = "bg-[url('/src/assets/weather/rainy.jpg')]";
  } else if (code === "6") {
    background = "bg-[url('/src/assets/weather/snowy.jpg')]";
  } else if (code === "7") {
    background = "bg-[url('/src/assets/weather/foggy.jpg')]";
  } else if (code === "8") {
    background = "bg-[url('/src/assets/weather/cloudy.jpg')]";
  } else {
    background = "";
  }

  return (
    <div className="min-w-80 max-w-90 bg-[#252733] border-top pt-0.5 rounded-lg h-70 hover:scale-105 duration-500 group">
      {weather && weather.cod === 200 && (
        <div
          className={`flex items-center justify-center text-[#151824] group-hover:text-[#c9b26c] duration-500 w-full rounded-lg text-center px-5 py-5 h-full ${
            fullCode === 800
              ? "bg-[url('/src/assets/weather/clear.jpg')]"
              : `${background}`
          } bg-cover bg-center`}
        >
          <div className="bg-[#252733]/30 py-8 px-12 rounded-xl">
            <h3 className="text-xl font-semibold">{weather.name}</h3>
            <div className="flex justify-center mt-1">
              <p className="text-7xl font-semibold">
                {weather.main.temp.toFixed(0)}
              </p>
              <p className="text-2xl">°</p>
            </div>
            <p className="text-base">{weather.weather[0].description}</p>
          </div>
        </div>
      )}
      {!weather && isLoading && (
        <div className="flex h-full w-full justify-center items-center text-[#6572aa]">
          <Loading message="Fetching Weather Data" />
        </div>
      )}
      {!isLoading && !weather && (
        <div className="flex h-full w-full justify-center items-center">
          <div>Error</div>
        </div>
      )}
    </div>
  );
}

export default Weather;
