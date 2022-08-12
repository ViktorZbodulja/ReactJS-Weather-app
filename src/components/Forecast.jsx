import { DateTime } from 'luxon';

const formatToLocalTime = (secs, zone, format = "ccc"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

function Forecast(props){

  const localTimeZone = props.dailyData.timezone;
    
  return (
        <div className={props.style ? "forecastDataHide l-kolona-8 k-kolona-10 c-kolona-11" : "forecast l-kolona-8 k-kolona-10 c-kolona-11"}>
          <h3 className='forecastHeader'>DAILY FORECAST</h3>
          <div className='daysOfTheWeek t-kolona-8 s-kolona-9 p-kolona-11 l-kolona-12'>
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