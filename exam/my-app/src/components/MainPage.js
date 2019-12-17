import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from '../styles/mainpage.module.css';

import Container from './Container';
const cityList = '569143,713514,464176,707860,519188,128378';


const MainPage = () => {
    const [weatherList, setData] = useState([]);

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/group?id=${cityList}&units=metric&appid=795f138d9f6871399760a03fac9ace13`)
            .then(res => {
                const data = res.data.list;
                const list = [];
                data.map((city) => {
                    list.push(
                        <Container cityName={city.name} temperature={city.main.temp} humidity={city.main.humidity} key={list.length}/>
                    )
                    return 0;
                })
                setData([
                    ...weatherList,
                    list
                ])
            })
    }, [])

    return (
        <div>{weatherList}</div>
    )
}

export default MainPage;