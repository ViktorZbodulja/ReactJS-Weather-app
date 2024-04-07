import { DateTime } from 'luxon';

const formatToLocalTime = (secs, zone, format = "ccc"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

function Forecast({dailyData, style }){

  const localTimeZone = dailyData.timezone;
    
  return (
        <div className={style ? "forecastDataHide l-column-8 k-column-10 c-column-11" : "forecast l-column-8 k-column-10 c-column-11"}>
          <h3 className='forecastHeader'>DAILY FORECAST</h3>
          <div className='daysOfTheWeek t-column-8 s-column-9 p-column-11 l-column-12'>
          {dailyData.daily.slice(1, 6).map((d) => 
            <div className='dayWeek' key={d.dt}>
              <div>{formatToLocalTime(d.dt, localTimeZone,)}</div>
              <div><img src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`} width="85px" alt='weather_icon'/></div>
              <div>{d.temp.min.toFixed(0)}°/{d.temp.max.toFixed(0)}°</div>   
            </div>
          )}
          </div>
        </div>    
    );
}


          


export default Forecast;