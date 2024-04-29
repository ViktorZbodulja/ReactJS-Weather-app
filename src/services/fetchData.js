const API_KEY = process.env.REACT_APP_ONECALL_25_API_KEY;

function resolveResponse(response) {
  if (response.status === 200) {
    return response.json();
  }

  if (response.status === 404) {
    throw new Error("City not found...");
  }

  throw new Error("Server error!");
}

export function fetchDataPicture(location) {
  //const locationWithoutSpaces = location.replace(/\s/g, "");
  const locationWithoutSpacesAndReplacements = location
    .replace(/[ČčŽžŠšĆć]/g, function (match) {
      switch (match) {
        case "Č":
        case "č":
        case "Ć":
        case "ć":
          return "c";
        case "Ž":
        case "ž":
          return "z";
        case "Š":
        case "š":
          return "s";
        case "Đ":
        case "đ":
          return "d";
        default:
          return match;
      }
    })
    .replace(/\s/g, "");
  const url = `https://api.unsplash.com/search/photos?page=1&query=${locationWithoutSpacesAndReplacements}&client_id=hpIuyGb7Hcgx0So1qtiqjL0vcZArJ9wJWGO4_jcS13Y`;
  return fetch(url).then((response) => resolveResponse(response));
}

export function fetchDataCity(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
  return fetch(url).then((response) => resolveResponse(response));
}

export function fetchDailyForecast(lat, lon) {
  const url = ` https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric`;
  return fetch(url).then((response) => resolveResponse(response));
}
//https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric

export function fetchAirPolution(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return fetch(url).then((response) => resolveResponse(response));
}
