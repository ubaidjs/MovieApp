import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../assets/react-tabs.css';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import MovieItem from '../components/MovieItem';
import tmdb from '../assets/tmdb.svg';
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
				`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
			),
			fetch(
				`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=2`
			),
			fetch(
				`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
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
		this.props.history.push(`/search/${this.state.searchTerm}`);
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
						Find your <br /> next <span>movie</span> here.
					</h1>
					<SearchBar
						handleSearchTerm={this.handleSearchTerm}
						handleSearchSubmit={this.handleSearchSubmit}
						searchTerm={this.state.searchTerm}
					/>
				</div>
				{!this.state.searchTerm && (
					<Tabs>
						<TabList>
							<Tab>Popular</Tab>
							<Tab>Top Rated</Tab>
							<Tab>Upcoming</Tab>
						</TabList>

						<TabPanel>
							<div className={styles.tabsContainer}>
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
						</TabPanel>
						<TabPanel>
							<div className={styles.tabsContainer}>
								<div className={styles.container}>
									{top_rated.results.map(item => {
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
						</TabPanel>
						<TabPanel>
							<div className={styles.tabsContainer}>
								<div className={styles.container}>
									{upcoming.results.map(item => {
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
						</TabPanel>
					</Tabs>
				)}
				{this.state.searchTerm && (
					<div className={styles.tmdbWrapper}>
						<img className={styles.tmdb} src={tmdb} alt="tmdb logo" />
					</div>
				)}
			</>
		);
	}
}
export default Home;
