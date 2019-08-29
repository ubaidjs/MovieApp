import React from 'react';
import MovieSlider from './MovieSlider';
import Loader from './Loader';
import styles from './Home.module.scss';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			popular: [],
			top_rated: [],
			upcoming: []
		};
	}

	async componentDidMount() {
		let [popular, top_rated, upcoming] = await Promise.all([
			fetch(
				`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=2`
			),
			fetch(
				`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=2`
			),
			fetch(
				`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=2`
			)
		]);
		const popularJson = await popular.json();
		const top_ratedJson = await top_rated.json();
		const upcomingJson = await upcoming.json();
		this.setState({
			popular: popularJson,
			top_rated: top_ratedJson,
			upcoming: upcomingJson
		});
	}

	render() {
		const { popular, top_rated, upcoming } = this.state;
		if (!popular.results) {
			return <Loader />;
		}

		return (
			<div className={styles.MovieSliderContainer}>
				<MovieSlider title="Popular" results={popular.results} />
				<MovieSlider title="Top Rated" results={top_rated.results} />
				<MovieSlider title="Upcoming" results={upcoming.results} />
			</div>
		);
	}
}
export default Home;
