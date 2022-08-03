import './App.css';
import { useState, useEffect } from 'react';
import { fetchDataPicture, fetchDataCity, fetchDailyForecast } from "./services/fetchData";
import Main from './components/Main';
import Footer from './components/Footer';
import Forecast from './components/Forecast';

function App() {

  const [data, setCityData] = useState(null);
  const [error, setCityError] = useState(null);
  
  const [pictureData, setPictureData ] = useState(null);
  const [pictureError, setPictureError] = useState(null);

  const [location, setLocationData] = useState("");

  const [dailyData, setDailyData] = useState("");
  const [dailyError, setDailyError] = useState("");

  //const { coord: { lon, lat}} = data;

  const setCity = event => {
    setLocationData(event.target.value);
  }

  const fetchData = event => {
    event.preventDefault();

    Promise.all([
      fetchDataPicture(location),
      fetchDataCity(location),
    ])
      .then(([pictureData, data]) => {
        setPictureData(pictureData);
        setCityData(data);
        fetchDailyForecast(data.coord.lat, data.coord.lon)
        .then(dailyData => setDailyData(dailyData));
      })
      .catch(error => alert(error));
  };

  //https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=eb592531e2e65899c02409436bf985cf&units=metric

 
var slika = "";

if(pictureData.total > 0){
  slika = pictureData.results[0].urls.full;
}
else{
  slika = "https://wallpapercave.com/wp/wp3594884.jpg";
}

if(location.trim() == "" || typeof location == "undefined"){
  slika = "https://wallpapercave.com/wp/wp3594884.jpg";
}

if(data.cod == "400" || data.cod == "404"){
  slika = "https://wallpapercave.com/wp/wp3594884.jpg";
}

  return (  
    <div className="App" style={{ background: `url(${slika}) no-repeat center center/cover` }}>
      <Main data={data} setCity={setCity} fetchData={fetchData} />
      <Forecast data={data} dailyData={dailyData} fetchData={fetchData} />
      <Footer data={data} location={location} />
    </div>
  );
}

export default App;
