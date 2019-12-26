import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/container.module.css';

const weatherList = {
	Clouds: 'cloudy',
	Clear: 'sun',
	Snow: 'snow',
	Rain: 'rain',
	Drizzle: 'rain',
	Thunderstorm: 'thunder',
	Mist: 'mist',
}

const Container = ({ cityName, temperature, humidity, weather, weather_icon, redirect }) => {

	return (
		<div className={styles.wrapper} onClick={() => {
			redirect({
				temp: temperature,
				humidity: humidity,
				weather: weatherList[weather_icon],
			})
		}}>
			<Link to={`city/${cityName}`} className={styles.link}>
				<div className={styles.upper_container}>
					<div>{cityName}</div>
					<div>{`${Math.round(temperature)}°C`}</div>
				</div>
				<div className={styles.lower_container}>
					<div>{`${humidity}%`}</div>
					<div><img src={`http://openweathermap.org/img/wn/${weather}@2x.png`} alt="..."/></div>
				</div>
			</Link>
		</div>
	);
};

export default Container;
