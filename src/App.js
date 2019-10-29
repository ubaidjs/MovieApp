import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './screens/Home';
import NavBar from './components/NavBar';
import Category from './screens/Category';
import MovieDetails from './screens/MovieDetails';

function App() {
	return (
		<BrowserRouter>
			<Route exact path="/" component={Home} />
			<Route path="/category" component={Category} />
			<Route path="/saved" render={() => <div>Saved</div>} />
			<Route path="/movie/:id" component={MovieDetails} />
			<NavBar />
		</BrowserRouter>
	);
}

export default App;
