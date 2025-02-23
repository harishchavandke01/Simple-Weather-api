const api_key = "739f3f1ac3d9ed357cc77d344187664a";
let BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=pune&appid=${api_key}&units=metric`;
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form")

formEl.addEventListener('submit',(event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    console.log(cityValue);
    const getCityToDisplay = document.querySelector(".display-city").innerText = cityValue.charAt(0).toUpperCase() + cityValue.slice(1).toLowerCase();
    getCityToDisplay.value = cityValue;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue)
{
    try {
        BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${api_key}&units=metric`;
        const response  = await fetch(BASE_URL);
        if(!response.ok)
        {
            throw new Error("Network Response was not ok");
        }

        const data = await response.json();
        console.log(data);
        let temp = Math.round(data["main"].temp);
        let description = data["weather"][0].description;
        let imgCode = data["weather"][0].icon;

        const details = [
            `Feels like = ${Math.round(data["main"].feels_like)}`,
            `Humidity = ${data["main"].humidity}`,
            `WindSpeed = ${data["wind"].speed}`
        ]


        let imgUrl = `http://openweathermap.org/img/wn/${imgCode}.png`
        weatherDataEl.querySelector("img").src = imgUrl;
        weatherDataEl.querySelector(".temparature").innerText = `${temp} °C`;
        weatherDataEl.querySelector(".description").innerText =  `${description}`;
        weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=>`<div>${detail}</div>`)

    } catch (error) {
        console.log(error)
    }
}