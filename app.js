const input = document.getElementById("input");
const weatherCard = document.querySelector(".weather");
const infoBtn = document.querySelector(".info-btn");
const form = document.querySelector("form");
const appID = "e5894a188b3b8889dfb340f7a30791e6";
const addInfo = document.querySelector(".addinfo");

// one call
const coord = navigator.geolocation.getCurrentPosition((position) => {
  // console.log(position.coords.latitude, position.coords.longitude);
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  let res = new Promise((resolve, reject) => {
    const coordWeather = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}&units=metric`
    );

    coordWeather
      .then((res) => {
        // console.log(res);
        const data = res.json();
        data.then((response) => {
          const { main, weather, name, wind } = response;
          // console.log(main, weather, name);
          cardShow(main, weather, name, wind);
        });
      })
      .catch((err) => {
        // console.log(err);
        setDefault();

        weatherCard.innerHTML = `<p class="mt-8 text-white text-lg tracking-widest">Please enter a valid city name</p>`;
      });
  });
});

const fetchWeather = async (e) => {
  e.preventDefault();
  const cityName = input.value;

  try {
    const bycity = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appID}&units=metric`
    );
    const data = await bycity.json();
    const { main, weather, name, wind } = data;
    console.log(data);
    cardShow(main, weather, name, wind);
  } catch (error) {
    // console.log(error);
    setDefault();

    weatherCard.innerHTML = `<p class="mt-8 text-white text-lg tracking-widest">Please enter a valid city name</p>`;
  }
};

form.addEventListener("submit", fetchWeather);
const setDefault = () => {
  input.value = "";
};

const cardShow = (main, weather, name, wind) => {
  const iconcode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconcode}.png`;
  // console.log(data);
  setDefault();

  weatherCard.innerHTML = ` <article class="flex flex-col items-center text-center text-white mb-4">
          <h2 class = "text-4xl capitalize mb-10 font-semibold tracking-widest">${name}</h2>
          <h4 class="temp text-7xl   mb-6 tracking-wider"> ${main.temp} &#176;C</h4>
          <div class ="flex justify-center items-center mb-8"><img src=${iconUrl} alt=${weather[0].description} class="inline scale-110 mr-1"> 
          <h4 class=" text-center text-2xl capitalize italic inline ml-1 tracking-wider "> ${weather[0].description}</h4>
          </div>
          <button
              class="info-btn white tracking-widest  text-center inline-block text-lg border-white border-2 px-4 py-2 rounded-lg text-white"
            >
              Show more info
            </button>
          </article>
          `;
  const infoBtn = document.querySelector(".info-btn");

  const addDiv = document.createElement("div")
  addDiv.classList.add("showinfo")
  addDiv.innerHTML = `
<h5>Max_Temp: ${main.temp_max}&#176;C</h5>
                  <h5>Min_Temp: ${main.temp_min}&#176;C</h5>
                  <h5>Pressure: ${main.pressure}hPa</h5>
                  <h5>Humidity: ${main.humidity}%</h5>
                  <h5>Wind-speed: ${wind.speed}m/s</h5>
                  <h5>Wind-dir: ${wind.deg}&#176;</h5>`;
  // btn func

  infoBtn.addEventListener("click", (e) => {
    if (infoBtn.textContent == "Show more info") {
      addInfo.appendChild(addDiv)
      console.log(addInfo);
      infoBtn.textContent = `Hide extra info`;
    } else {
      infoBtn.textContent = `Show more info`;
      addInfo.innerHTML =''
    }
  });
};
