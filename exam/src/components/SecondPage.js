import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/secondpage.module.css';
import snow from '../snow.jpg';
import sun from '../sun.jpg';
import mist from '../mist.jpg';
import cloudy from '../cloudy.jpg';
import thunder from '../thunderstorm.jpg';
import rain from '../rain.jpg';

const background = {
    sun: sun,
    snow: snow,
    mist: mist,
    cloudy: cloudy,
    thunder: thunder,
    rain: rain,
}

function SecondPage({ match, temp, humidity, weather }) {

    console.log(weather);

    return (
        <div className={styles.wrapper} style={{'backgroundImage': `url(${background[weather]})`}}>
            <Link to='/' className={styles.link}>&#8678;</Link>
            <div className={styles.city}>{match.params.name}</div>
            <div className={styles.data}>
                <div className={styles.temperature}>{`${Math.round(temp)}°C`}</div>
                <div className={styles.humidity}>{`${humidity}%`}</div>
            </div>
            
        </div>
    );
}

export default SecondPage;