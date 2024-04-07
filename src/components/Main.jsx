import { DateTime } from 'luxon';
import { MdLocationOn } from "react-icons/md";
//svg
import clearDay from '../svg/clear-day.svg'
import rain from '../svg/rain.svg';
import snow from '../svg/snow.svg';
import thunderstorm from '../svg/thunderstorms-day-rain.svg';
import partlyColudy from '../svg/partly-cloudy-day.svg';
import overcastDay from '../svg/overcast-day.svg';
import fog from '../svg/partly-cloudy-day-fog.svg';

function Main({data, dailyData, airPolution, changeStyle, button}){
  const emojiHandler = () => {
    let emoji = null;
    if (typeof data.main !== "undefined") {
      switch (data.weather[0].description) {
        case "clear sky":
          emoji = clearDay;
          break;
        case "few clouds":
        case "scattered clouds":
        case "overcast clouds":
          emoji = partlyColudy;
          break;
        case "broken clouds":
          emoji = overcastDay;
          break;
        case "rain":
        case "light rain":
        case "drizzle":
        case "shower rain":
        case "moderate rain":
        case "heavy intensity rain":
          emoji = rain;
          break;
        case "thunderstorm":
        case "thunderstorm with light rain":
          case "thunderstorm with rain":
          emoji = thunderstorm;
          break;
        case "snow":
        case "heavy snow":
          emoji = snow;
          break;
        case "mist":
        case "fog":
          emoji = fog;
          break;
        default:
          emoji = "";
          break;
      }
      return emoji;
    } else {
      emoji = "";
    }
  }

  const airPolutionHandler = () => {
    if (airPolution.list && airPolution.list.length > 0) {
      let polutionLevel = "";
      let color = "";
      switch (airPolution.list[0].main.aqi) {
        case 1:
          polutionLevel = "Very Low";
          color = "#67de67";
          break;
        case 2:
          polutionLevel = "Low";
          color = "#67de67";
          break;
        case 3:
          polutionLevel = "Medium";
          color = "#e3d755";
          break;
        case 4:
          polutionLevel = "High";
          color = "#e4854a";
          break;
        case 5:
          polutionLevel = "Very High";
          color = "red";
          break;
        default:
          polutionLevel = "";
          break;
      }
      return <span style={{ color: color }}>{polutionLevel}</span>;
    } else {
      return "";
    }
  };
    const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
          ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

    const localTimeZone = data.timezone;
    const localTimeZoneToHours = localTimeZone/3600;
    let showLocalTime = 0;
    if(localTimeZoneToHours >= 0){
      showLocalTime = "UTC+" + localTimeZoneToHours;
    }
    else if(localTimeZoneToHours < 0){
      showLocalTime = "UTC" + localTimeZoneToHours;
    }
    
    return (
      <main className='flexContainer'>
        <div className="allDataShow t-column-6 p-column-7 k-column-10 c-column-11 l-column-8">
          <div className='city'>{data.name && <div><MdLocationOn size="45px" id="MdLocation" />{data.name}</div>}</div>
          {data.sys && <div className='country'>{data.sys.country}</div>}
          <div className='temperature'>
            {data.main && <h3>{data.main.temp.toFixed(1)} °C</h3>}
            {dailyData.daily && <div className='min_max_cont'>
                                    <span>min: {Math.floor(dailyData.daily[0].temp.min)} °C</span>
                                    <span>max: {Math.ceil(dailyData.daily[0].temp.max)} °C</span>
                                </div>}
          </div>
         
          <div className='clouds'>
            {data.weather && <div className='clouds_details'><img className='weatherSvg' src={emojiHandler()} width="65px" alt='weather_icon' /><h3>{data.weather[0].description}</h3></div>}
          </div>
          <div className='airPressure_polution_container'>
          {airPolution.list && 
                              <div className='polution_container'>
                                <h3>Air pollution:</h3>
                                <div>{airPolutionHandler()}</div>
                              </div>}
            {data.main && <div>{data.main.pressure} hPa</div>} 
          </div>
        </div>
        {data.main && <div className='localTime'><div>{formatToLocalTime(data.dt, showLocalTime)}</div></div>}
      <button className="forecastButton" onClick={changeStyle}>{button ? "Hide Forecast" : "Show Forecast"}</button>
      </main>
    );
}

export default Main;