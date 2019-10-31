import React from 'react';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import MovieItem from '../components/MovieItem';
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
			<>
				<div className={styles.topBar}>
					<h1 className={styles.heading}>
						Find your <br /> next <span>movie</span> here
					</h1>
					<SearchBar />
				</div>
				<div className={styles.tabsContainer}>
					<h1>Popular</h1>
					<div className={styles.container}>
						{popular.results.map(item => {
							return (
								<div className={styles.movieContainer}>
									<MovieItem
										key={item.id}
										name={item.title}
										imgSrc={item.poster_path}
										id={item.id}
										year={item.release_date}
									/>
								</div>
							);
						})}
					</div>

					{/* <MovieSlider title="Popular" results={popular.results} />
					<MovieSlider title="Top Rated" results={top_rated.results} />
					<MovieSlider title="Upcoming" results={upcoming.results} /> */}
				</div>
			</>
		);
	}
}
export default Home;
