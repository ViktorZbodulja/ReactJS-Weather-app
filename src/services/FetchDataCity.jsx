export function fetchDataCity(url, setCityData, setCityError) {
    const loc = url ; 
         
    return fetch(loc)
    .then(response =>response.json())
    .then(data => setCityData(data))
    .catch(error => setCityError(error.toString()));
}