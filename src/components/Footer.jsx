import { FaTemperatureHigh } from "react-icons/fa";
import { BsFillDropletFill } from "react-icons/bs";
import { SiTailwindcss } from "react-icons/si";

function Footer(props){
    return (
        <footer className='footer'>
        <div className='extraData'>
          <div className='feelsLike'>
            <div>{props.data.main ? <div><FaTemperatureHigh size={30} id="temperatureHigh"/>{props.data.main.feels_like.toFixed(1)} °C</div> : <div><FaTemperatureHigh size={30} id="temperatureHigh"/> ... </div>}</div>
            <div>Feels Like</div>
          </div>
          <div className='humidityClass'>
            <div>{props.data.main ? <div><BsFillDropletFill size={27} id="fillDroplet" />{props.data.main.humidity} %</div> : <div><BsFillDropletFill size={27} id="fillDroplet" /> ... </div>}</div>
            <div>Humidity</div>
          </div>
          <div className='windSpeed'>
            <div>{props.data.wind ? <div><SiTailwindcss size={27} id="tailWind"/>{props.data.wind.speed} km/h</div> : <div><SiTailwindcss size={27} id="tailWind"/> ... </div>}</div>
            <div>Wind Speed</div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;