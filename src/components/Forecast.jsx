import { DateTime } from 'luxon';

const formatToLocalTime = (secs, zone, format = "ccc"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

function Forecast(props){

  const localTimeZone = props.dailyData.timezone;
    
  return (
        <div className={props.style ? "forecastDataHide" : "forecast"}>
          <h3>DAILY FORECAST</h3>
          <div className='daysOfTheWeek'>
          {props.dailyData.daily.slice(1, 6).map((d) => 
            <div className='dayWeek' key={d.dt}>
              <div>{formatToLocalTime(d.dt, localTimeZone,)}</div>
              <div><img src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`} width="85px"/></div>
              <div>{d.temp.min.toFixed(0)}°/{d.temp.max.toFixed(0)}°</div>   
            </div>
          )}
          </div>
        </div>    
    );
}


          


export default Forecast;