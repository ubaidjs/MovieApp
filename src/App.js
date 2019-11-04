import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactGA from 'react-ga';

import MovieDetails from './screens/MovieDetails';
import Home from './screens/Home';
import Category from './screens/Category';
import Genre from './screens/Genre';
import Search from './screens/Search';
import Saved from './screens/Saved';
import NavBar from './components/NavBar';

function App() {
	ReactGA.initialize('UA-147969670-2');
	ReactGA.pageview('/');
	return (
		<BrowserRouter>
			<Route exact path="/" component={Home} />
			<Route exact path="/category" component={Category} />
			<Route path="/category/:genrename/:id/:page" component={Genre} />
			<Route path="/saved" component={Saved} />
			<Route path="/movie/:id" component={MovieDetails} />
			<Route path="/search/:query" component={Search} />
			<NavBar />
		</BrowserRouter>
	);
}

export default App;
