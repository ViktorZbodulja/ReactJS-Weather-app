export function fetchDailyForecast(url, setDailyData, setDailyError) {
    const loc = url ; 
         
    return fetch(loc)
    .then(response =>response.json())
    .then(data => setDailyData(data))
    .catch(error => setDailyError(error.toString()));
}