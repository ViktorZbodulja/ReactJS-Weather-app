export function fetchDataPitcure(url, setPictureData, setPictureError) {
    const loc = url ; 
         
    return fetch(loc)
    .then(response =>response.json())
    .then(data => setPictureData(data))
    .catch(error => setPictureError(error.toString()));
}
