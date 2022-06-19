import React from "react";
import TurkeyMap from "turkey-map-react";
import getWeather from "./services/weather";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faCloudRain, faCloudBolt, faSnowflake, faSun } from '@fortawesome/free-solid-svg-icons'
import Toast from './component/weather/Toast'
import { useDispatch, useSelector } from "react-redux";
import { setCity, setTemp, setCountry, setWeather, setName } from './component/weather/weatherSlice';

function Weather(weather) {
    switch (weather) {
      case "Clouds":
        return faCloud;
      case "Rain":
        return faCloudRain
      case "Thunderstorm":
        return faCloudBolt
      case "Snow":
        return faSnowflake
      case "Clear":
        return faSun
      case "Drizzle":
        return faCloudRain
      default:
        return faCloud;
    }
}

function App() {
  
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(!sessionStorage.getItem("key") || sessionStorage.getItem("key") === "error");
  const city = useSelector(state => state.weather.city);
  const weather = useSelector(state => state.weather.weather);
  const temp = useSelector(state => state.weather.temp);
  const country = useSelector(state => state.weather.country);
  const name = useSelector(state => state.weather.name);
  const [inputKey, setInputKey] = React.useState("");

  async function saveKey() {
    sessionStorage.setItem("key", inputKey);
    setShowModal(false)
  }

  function getKey() {
    return sessionStorage.getItem("key");
  }

  try {
    if (typeof getKey() === "string" && getKey() !== "error") {
      getWeather(city, getKey())
      .then((response) => {
        dispatch(setWeather(response.weather[0].main));
        dispatch(setTemp(response.main.temp));
        dispatch(setCountry(response.sys.country));
        dispatch(setName(response.name));
      });
    }
  } catch (err) {
    setShowModal(true)
  }

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    OpenWeatherMap API Key
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                <input data-testid="key-input" onInput={(e) => setInputKey(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Uygulama içeriğine erişebilmek için lütfen www.openweathermap.org 
                    adresinden API anahtarını alınız. Nasıl yapacağınızı bilmiyorsanız 
                    OpenWeatherMap uygulamasına kayıt olduktan sonra '<a style={{color: '#ea4335'}} href="https://home.openweathermap.org/api_keys">Anahtarlarım</a>'
                    adresine gidebilirsiniz.
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    disabled={!inputKey}
                    onClick={() => saveKey()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div className="bg-gradient-to-br from-yellow-400 to-pink-500 via-red-400 w-full h-screen flex flex-col items-center justify-center p-8">
        { sessionStorage.getItem("key") === "error" ? <Toast/> : null }
        <div data-testid="selectedCity" className="flex flex-col items-center justify-center text-white">
          {city}
        </div>
        <TurkeyMap onClick={ ({ name }) => dispatch(setCity(name)) } />
        <div className="bg-white p-8 bg-opacity-80 rounded-3xl flex space-x-12 items-center shadow-md">
          <div>
          <FontAwesomeIcon size="3x" icon={Weather(weather)} style={{ color: '#606060'}} />
            <p className="text-center text-gray-500 mt-2 text-sm">{weather}</p>
          </div>
          <div>
            <p id="degreesText" className="text-6xl font-bold text-right text-gray-900">{!!sessionStorage.getItem("key") && sessionStorage.getItem("key") !== "error" ? (temp - 272.15).toFixed(1) : "-"} C°</p>
            <p id="nameAndCountry" className="text-gray-500 text-sm">{ name }, { country }</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
