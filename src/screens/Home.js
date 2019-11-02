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
			upcoming: [],
			searchTerm: ''
		};
		this.handleSearchTerm = this.handleSearchTerm.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
	}

	async componentDidMount() {
		let [popular, top_rated, upcoming] = await Promise.all([
			fetch(
				`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=5`
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

	handleSearchTerm(e) {
		const term = e.target.value.replace(/ /g, '+');
		this.setState(prevState => {
			return { ...prevState, searchTerm: term, searchResult: [] };
		});
	}

	async handleSearchSubmit(e) {
		e.preventDefault();
		console.log('sumbit function called');
		// const searchResult = await fetch(
		// 	`https://api.themoviedb.org/3/search/movie?api_key=73f48f5f09fbac24a3582ebe2607082f&language=en-US&query=${this.state.searchTerm}&page=1&include_adult=false`
		// );

		// const searchResultJson = await searchResult.json();
		// this.setState(
		// 	prevState => {
		// 		return {
		// 			...prevState,
		// 			searchResult: searchResultJson.results
		// 		};
		// 	},
		// 	() => console.log(this.state.searchResult)
		// );
		this.props.history.push(`/search/${this.state.searchTerm}`);
	}

	render() {
		const { popular } = this.state;

		if (!popular.results) {
			return <Loader />;
		}

		return (
			<>
				<div className={styles.topBar}>
					<h1 className={styles.heading}>
						Find your <br /> next <span>movie</span> here
					</h1>
					<SearchBar
						handleSearchTerm={this.handleSearchTerm}
						handleSearchSubmit={this.handleSearchSubmit}
					/>
				</div>
				{this.state.searchResult &&
					this.state.searchResult.map(item => {
						return (
							<div>
								<MovieItem
									name={item.title}
									imgSrc={item.poster_path}
									id={item.id}
									year={item.release_date}
								/>
							</div>
						);
					})}
				{!this.state.searchTerm && (
					<div className={styles.tabsContainer}>
						<p>Popular</p>
						<div className={styles.container}>
							{popular.results.map(item => {
								return (
									<div className={styles.movieContainer} key={item.id}>
										<MovieItem
											name={item.title}
											imgSrc={item.poster_path}
											id={item.id}
											year={item.release_date}
										/>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</>
		);
	}
}
export default Home;
