import React, { useState } from 'react';
import MainPage from './components/MainPage';
import SecondPage from './components/SecondPage';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';


function App() {

	const [secondPage, setSecondPage] = useState(null);

	const setPage = (data) => {
		setSecondPage(data);
	}

	return (
		<BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
			<Route exact path='/' render={(props) => <MainPage {...props} redirect={(data) => setPage(data)} /> } />
			<Route path='/city/:name' render={(props) => <SecondPage {...props} temp={secondPage.temp} humidity={secondPage.humidity} weather={secondPage.weather} />} />
		</BrowserRouter>
	);
}

export default App;
