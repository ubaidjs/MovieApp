import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styles from './App.module.scss';
import Home from './components/Home';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Category from './components/Category';
import MovieDetails from './components/MovieDetails';

function App() {
	return (
		<BrowserRouter>
			<div className={styles.topBar}>
				<h1 className={styles.heading}>
					Find your <br /> next <span>movie</span> here
				</h1>
				<SearchBar />
			</div>
			<Route exact path="/" component={Home} />
			<Route path="/category" component={Category} />
			<Route path="/saved" render={() => <div>Saved</div>} />
			<Route path="/movie/:id" component={MovieDetails} />
			<NavBar />
		</BrowserRouter>
	);
}

export default App;
