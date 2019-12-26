import React, { useState } from 'react';
import styles from '../styles/input.module.css';
import axios from 'axios';
import Container from './Container';

function Input({ add }) {

    const [inputHandler, setInput] = useState(null);

    const createWeather = (event) => {
        let request = null;
        event.preventDefault();
        if (inputHandler.split(' ').length > 1) {
            request = `weather?lat=${inputHandler.split(' ')[0]}&lon=${inputHandler.split(' ')[1]}`;
        } else if (isNaN(inputHandler)) {
            request = `weather?q=${inputHandler}`;
        } else {
            request = `group?id=${inputHandler}`;
        }
        axios.get(
            `https://api.openweathermap.org/data/2.5/${request}&units=metric&appid=795f138d9f6871399760a03fac9ace13`
        ).then((res) => {
            if (res.status === 200) {
                if (res.data.name !== '') {
                    localStorage.setItem('cities',
                        `${localStorage.getItem('cities')},${res.data.id}`
                    );
                    add(
                        <Container
                                    cityName={res.data.name}
                                    temperature={res.data.main.temp}
                                    humidity={res.data.main.humidity}
                                    weather={res.data.weather[0].icon}
                                    weather_icon={res.data.weather[0].main} />
                    );
                } else alert('Invalid coordinates.');
            }
        })
    }

    return (
        <form onSubmit={(event) => createWeather(event)} className={styles.main_form}>
            <input type='text' onChange={(event) => setInput(event.target.value)} className={styles.input}/>
        </form>
    );
}

export default Input;