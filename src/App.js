import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styles from './App.module.scss';
import Home from './components/Home';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import MovieDetails from './components/MovieDetails';

function App() {
	return (
		<BrowserRouter>
			<div className={styles.topBar}>
				<SearchBar />
			</div>
			<Route exact path="/" component={Home} />
			<Route path="/category" render={() => <div>Category</div>} />
			<Route path="/saved" render={() => <div>Saved</div>} />
			<Route path="/movie/:id" component={MovieDetails} />
			<NavBar />
		</BrowserRouter>
	);
}

export default App;
