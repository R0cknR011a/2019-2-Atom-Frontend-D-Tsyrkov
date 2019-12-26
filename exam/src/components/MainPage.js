import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/mainpage.module.css';
import Input from './WeatherAddInput';
import Container from './Container';

const hardcode = '3169070,6359304,2950159,6455259,524901';

// moscow: '524901',
// paris: '6455259',
// berlin: '2950159',
// madrid: '6359304',
// rome: '3169070'

const MainPage = ({ redirect }) => {

	const [weatherList, setData] = useState([]);
	const [inputToggle, setInput] = useState(false);

	useEffect(() => {
		let current_pos = localStorage.getItem('location');
		if (current_pos === null) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((pos) => {
					current_pos = {};
					current_pos['lat'] = pos.coords.latitude;
					current_pos['long'] = pos.coords.longitude;
					localStorage.setItem('location', JSON.stringify(current_pos));
				});
			} else {
				current_pos = {};
				current_pos['lat'] = 55;
				current_pos['long'] = 37;
				localStorage.setItem('location', JSON.stringify(current_pos));
			}
		} else {
			current_pos = JSON.parse(current_pos);
		};
		let cityList = localStorage.getItem('cities');
		if (cityList === null) {
			localStorage.setItem('cities', hardcode);
			cityList = hardcode;
		}
		axios.get(
			`https://api.openweathermap.org/data/2.5/group?id=${cityList}&units=metric&appid=795f138d9f6871399760a03fac9ace13`
		).then((res) => {
			let list = [];
			const data = res.data.list;
			list = data.map((elem) => {
				return <Container
						cityName={elem.name}
						humidity={elem.main.humidity}
						temperature={elem.main.temp}
						weather={elem.weather[0].icon}
						weather_icon={elem.weather[0].main}
						key={data.indexOf(elem)}
						redirect={(data) => redirect(data)}/>
			});
			axios.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${current_pos.lat}&lon=${current_pos.long}&units=metric&appid=795f138d9f6871399760a03fac9ace13`,
			).then((res) => {
				list.push(
					<Container
						cityName={res.data.name}
						humidity={res.data.main.humidity}
						temperature={res.data.main.temp}
						weather={res.data.weather[0].icon}
						weather_icon={res.data.weather[0].main}
						key={list.length}
						redirect={(data) => redirect(data)}/>
				);
				setData(list);
			});
		});
	}, [redirect]);

	const addFromInput = (elem) => {
		setData([
			...weatherList,
			elem
		]);
	}

	return <div>
			<div className={styles.weatherlist}>{weatherList}</div>
			{inputToggle ? <Input add={(elem) => addFromInput(elem)}/> : null}
			<button className={styles.add_button} type="button" onClick={() => setInput(!inputToggle)}>&#43;</button>
		</div>;
};

export default MainPage;
