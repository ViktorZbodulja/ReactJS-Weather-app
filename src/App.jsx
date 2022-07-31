import './App.css';
import { useState, useEffect } from 'react';
import { fetchDataCity } from "./services/FetchDataCity";
import { fetchDataPitcure } from "./services/FetchDataPitcure";
import { fetchDailyForecast } from './services/FetchDailyForecast';
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

var fieldValidation = "";
  const handlePictureChange = (event) => {
    event.preventDefault();
    fieldValidation = event.target.field.value;

    if(fieldValidation.trim() !== ""){
      setLocationData(event.target.field.value);
    }
  }

  //https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=eb592531e2e65899c02409436bf985cf&units=metric

  useEffect(() => {
    fetchDataPitcure('https://api.unsplash.com/search/photos?page=1&query=' + location + '&client_id=hpIuyGb7Hcgx0So1qtiqjL0vcZArJ9wJWGO4_jcS13Y', setPictureData, setPictureError)
  }, [location]);

  useEffect(() => { 
    fetchDataCity('https://api.openweathermap.org/data/2.5/weather?q='+ location +'&units=metric&appid=eb592531e2e65899c02409436bf985cf', setCityData, setCityError);
  }, [location]);

  useEffect(() => { 
    fetchDailyForecast('https://api.openweathermap.org/data/2.5/onecall?lat='+ "18" +'&lon='+ "23" +'&exclude=current,minutely,hourly,alerts&appid=eb592531e2e65899c02409436bf985cf&units=metric', setDailyData, setDailyError);
  }, [location]);

  if(error){
    return <div>Greška: {error}</div>;
  }

  if(pictureError){
    return <div>Greška: {pictureError}</div>;
  }

  if(!data){
    return <div>Učitavanje podataka</div>;
  }

  if(!pictureData){
    return <div>Učitavanje podataka</div>;
  }

  if(dailyError){
    return <div>Greška: {dailyError}</div>;
  }

  if(!dailyData){
    return <div>Učitavanje podataka</div>;
  }

var slika = "";

//alert("Vrti se 4 puta kod dohvata");
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

if(fieldValidation !== "" && pictureData.results[0].urls.full !== ""){
  slika = "https://wallpapercave.com/wp/wp3594884.jpg";
}

  return (  
    <div className="App" style={{ background: `url(${slika}) no-repeat center center/cover` }}>
      <Main data={data} handlePictureChange={handlePictureChange} />
      {data.coord ? <Forecast dailyData={dailyData} data={data} /> : ""}
      <Footer data={data} location={location} />
      
    </div>
  );
}

export default App;
