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
  const url = `https://api.unsplash.com/search/photos?page=1&query=${location}&client_id=hpIuyGb7Hcgx0So1qtiqjL0vcZArJ9wJWGO4_jcS13Y`;
  return fetch(url).then((response) => resolveResponse(response));
}

export function fetchDataCity(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=eb592531e2e65899c02409436bf985cf`;
  return fetch(url).then((response) => resolveResponse(response));
}

export function fetchDailyForecast(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=eb592531e2e65899c02409436bf985cf&units=metric`;
  return fetch(url).then((response) => resolveResponse(response));
}
