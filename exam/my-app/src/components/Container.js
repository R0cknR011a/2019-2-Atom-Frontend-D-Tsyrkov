import React from 'react';
import styles from '../styles/container.module.css';

const Container = ({ cityName, temperature, humidity }) => {
    return (
        <div>
            <div className={styles.uppper_container}>
                <div>{cityName}</div>
                <div>{temperature}</div>
            </div>
            <div>
                <div>{humidity}</div>
            </div>
        </div>
    )
}

export default Container;