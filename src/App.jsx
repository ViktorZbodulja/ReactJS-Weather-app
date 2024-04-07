import "./style/app.css";
import { useState } from 'react';
import { fetchDataPicture, fetchDataCity, fetchDailyForecast, fetchAirPolution } from "./services/fetchData";
//pics
import bgImg2 from "./img/background2_img.jpg";
import dawnImg from "./img/dawn_img.jpg";
import dayImg from "./img/day_img.jpg";
import eveningImg from "./img/evening_img.jpg";
import nightImg from "./img/night_img.jpg";
//components
import Main from './components/Main';
import Footer from './components/Footer';
import Forecast from './components/Forecast';

import { AiOutlineSearch } from "react-icons/ai";

function App() {
  const [data, setCityData] = useState(null);
  const [pictureData, setPictureData] = useState(null);
  const [location, setLocationData] = useState("");
  const [dailyData, setDailyData] = useState("");
  const [airPolution, setAirPolution] = useState("");
  //forecast button toggle
  const [style, setStyle] = useState(true);
  const [button, setButton] = useState(false);

  const changeStyle = () => {
    setStyle(current => !current);
    setButton(current => !current);
  };
  const setCity = event => {
    setLocationData(event.target.value);
  }

  const fetchData = event => {
    event.preventDefault();
    
    fetchDataCity(location)
      .then(data => {
        setCityData(data);
        return Promise.all([
          fetchDataPicture(location),
          fetchDailyForecast(data.coord.lat, data.coord.lon),
          fetchAirPolution(data.coord.lat, data.coord.lon)
        ]);
      })
      .then(([pictureData, dailyData, airPolution]) => {
        setPictureData(pictureData);
        setDailyData(dailyData);
        setAirPolution(airPolution);
      })
      .catch(error => alert(error));
  };
 
  //https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=eb592531e2e65899c02409436bf985cf&units=metric

  let bgPicture = "";
  let hours = new Date().getHours();
  if (pictureData) {
    if (pictureData.total > 0) {
      bgPicture = pictureData.results[0].urls.regular;
    }
    else {
      bgPicture = bgImg2;
    }
  } else {
    if (hours > 5 && hours <= 7) {
      bgPicture = dawnImg;
    }
    else if (hours > 7 && hours <= 17) {
      bgPicture = dayImg;
    }
    else if (hours > 17 && hours < 20) {
      bgPicture = eveningImg;
    }
    else {
      bgPicture = nightImg;
    }
  }

  return (
    <div className="App" style={{ background: `url(${bgPicture}) no-repeat fixed center center/cover` }}>
      <div className='formClass'>
        <p>ForecastNow: Your Weather Assistant</p>
        <form className='formBlock' onSubmit={fetchData}>
          <input type="text" name="field" id="field" placeholder='Enter City' onChange={setCity} />
          <button className="searchButton" type='submit' ><AiOutlineSearch size="25px" color='white' /></button>
          {data && data.message === "city not found" ? <div className='notExist'>City not found. Please enter other city.</div> : ""}
        </form>
      </div>
      {data && dailyData ? <Main data={data} dailyData={dailyData} changeStyle={changeStyle} button={button} airPolution={airPolution} /> : ""}
      {data && dailyData ? <Forecast dailyData={dailyData} style={style} /> : ""}
      <Footer data={data} />
    </div>
  );
}

export default App;
