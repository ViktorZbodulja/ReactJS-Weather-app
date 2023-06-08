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

function Main({data, changeStyle, button}){
  var emoji = null;
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
        emoji = rain;
        break;
      case "thunderstorm":
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
  } else {
    emoji = "";
  }
    
    const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
    ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

    const localTimeZone = data.timezone;
    const localTimeZoneToHours = localTimeZone/3600;
    var showLocalTime = 0;
    if(localTimeZoneToHours >= 0){
     var showLocalTime = "UTC+" + localTimeZoneToHours;
    }
    else if(localTimeZoneToHours < 0){
     var showLocalTime = "UTC" + localTimeZoneToHours;
    }
    
    return (
      <main className='flexContainer'>
        <div className="allDataShow t-column-6 p-column-7 k-column-10 c-column-11 l-column-8">
          <div className='city'>{data.name ? <div><MdLocationOn size="45px" id="MdLocation" />{data.name}</div> : ""}</div>
          {data.sys ? <div className='country'>{data.sys.country}</div> : ""}
          <div className='temperature'>
            {data.main ? <h3>{data.main.temp.toFixed(1)} °C</h3> : ""}
          </div>
          <div className='clouds'>
            {data.weather ? <h3><img className='weatherSvg' src={emoji} width="65px" />{data.weather[0].description}</h3> : ""}
          </div>
          <div className='airPressure'>
            {data.main ? <div>{data.main.pressure} hPa</div> : ""} 
          </div>
        </div>
        {data.main ? <div className='localTime'><div>{formatToLocalTime(data.dt, showLocalTime)}</div></div> : ""}
      <button className="forecastButton" onClick={changeStyle}>{button ? "Hide Forecast" : "Show Forecast"}</button>
      </main>
    );
}

export default Main;