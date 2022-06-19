import axios from "axios";

export default async function getWeather(city, apiKey) {
    try {
        return axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => {
            return response.data;
        }).catch(error => {
            console.error(error);
            sessionStorage.setItem("key", "error");
        });
    } catch (error) {
        console.error(error);
    }
}