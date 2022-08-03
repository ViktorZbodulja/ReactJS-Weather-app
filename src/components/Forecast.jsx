import clearDay from '../svg/clear-day.svg'
import rain from '../svg/rain.svg';
import snow from '../svg/snow.svg';
import thunderstorm from '../svg/thunderstorms-day-rain.svg';
import partlyColudy from '../svg/partly-cloudy-day.svg';
import overcastDay from '../svg/overcast-day.svg';
import fog from '../svg/partly-cloudy-day-fog.svg';

import { DateTime } from 'luxon';

const formatToLocalTime = (secs, zone, format = "ccc"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

function Forecast(props){
  
  const localTimeZone = props.dailyData.timezone;
    
  return (
        <div className="forecast">
          <h3>DAILY FORECAST</h3>
          <div className='daysOfTheWeek'>
            <div className='dayWeek'>
              <div>{formatToLocalTime(props.dailyData.daily[1].dt, localTimeZone,)}</div>
              <div><img src={overcastDay} width="70px"/></div>
              <div>{props.dailyData.daily[1].temp.day.toFixed(0)}°/18°</div>   
            </div>
            <div className='dayWeek'>
              <div>{formatToLocalTime(props.dailyData.daily[2].dt, localTimeZone)}</div>
              <div><img src={overcastDay} width="70px"/></div>
              <div>{props.dailyData.daily[2].temp.day.toFixed(0)}°/18°</div>
            </div>
            <div className='dayWeek'>
              <div>{formatToLocalTime(props.dailyData.daily[3].dt, localTimeZone)}</div>
              <div><img src={overcastDay} width="70px"/></div>
              <div>23°/18°</div>
            </div>
            <div className='dayWeek'>
              <div>{formatToLocalTime(props.dailyData.daily[4].dt, localTimeZone)}</div>
              <div><img src={overcastDay} width="70px"/></div>
              <div>23°/18°</div>
            </div>
            <div className='dayWeek'>
              <div>{formatToLocalTime(props.dailyData.daily[5].dt, localTimeZone)}</div>
              <div><img src={overcastDay} width="70px"/></div>
              <div>23°/18°</div>
            </div>
          </div>
        </div>
    );
}

export default Forecast;