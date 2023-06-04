import { DateTime } from 'luxon';
import { MdLocationOn } from "react-icons/md";

import clearDay from '../svg/clear-day.svg'
import rain from '../svg/rain.svg';
import snow from '../svg/snow.svg';
import thunderstorm from '../svg/thunderstorms-day-rain.svg';
import partlyColudy from '../svg/partly-cloudy-day.svg';
import overcastDay from '../svg/overcast-day.svg';
import fog from '../svg/partly-cloudy-day-fog.svg';

function Main(props){

  var emoji = null;
  if (typeof props.data.main !== "undefined") {
    switch (props.data.weather[0].description) {
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

    const localTimeZone = props.data.timezone;
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
          <div className='city'>{props.data.name ? <div><MdLocationOn size="45px" id="MdLocation" />{props.data.name}</div> : ""}</div>
          {props.data.sys ? <div className='country'>{props.data.sys.country}</div> : ""}
          <div className='temperature'>
            {props.data.main ? <h3>{props.data.main.temp.toFixed(1)} °C</h3> : ""}
          </div>
          <div className='clouds'>
            {props.data.weather ? <h3><img className='weatherSvg' src={emoji} width="65px" />{props.data.weather[0].description}</h3> : ""}
          </div>
          <div className='airPressure'>
            {props.data.main ? <div>{props.data.main.pressure} hPa</div> : ""} 
          </div>
        </div>
        {props.data.main ? <div className='localTime'><div>{formatToLocalTime(props.data.dt, showLocalTime)}</div></div> : ""}
      <button className="forecastButton" onClick={props.changeStyle}>{props.button ? "Show Forecast" : "Hide Forecast"}</button>
      </main>
    );
}

export default Main;