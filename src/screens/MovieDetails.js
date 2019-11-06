/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import Moment from 'react-moment';
//icons
import saveIcon from '../assets/saved.svg';
import saveIconFilled from '../assets/saved-filled.svg';
//modules
import styles from './MovieDetails.module.scss';
import Loader from '../components/Loader';

class MovieDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			detail: [],
			language: '',
			cast: [],
			trailer: '',
			loading: true
		};
		this.saveMovie = this.saveMovie.bind(this);
	}

	async componentDidMount() {
		const [detail, cast, trailer] = await Promise.all([
			fetch(
				`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`
			),
			fetch(
				`https://api.themoviedb.org/3/movie/${this.props.match.params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
			),
			fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
			`)
		]);
		const detailJson = await detail.json();
		const castJson = await cast.json();
		const trailerJson = await trailer.json();

		const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
		let isSaved = [];
		if (savedMovies) {
			isSaved = savedMovies.filter(item => {
				return item.id === detailJson.id;
			});
		}

		this.setState({
			detail: detailJson,
			language: detailJson.spoken_languages[0].name,
			cast: castJson.cast,
			trailer: trailerJson.results.length ? trailerJson.results[0].key : '',
			loading: false,
			isSaved: !!isSaved.length,
			localMovies: savedMovies
		});
	}

	saveMovie() {
		if (!this.state.isSaved) {
			if (this.state.localMovies) {
				localStorage.setItem(
					'savedMovies',
					JSON.stringify([...this.state.localMovies, this.state.detail])
				);
			} else {
				localStorage.setItem(
					'savedMovies',
					JSON.stringify([this.state.detail])
				);
			}
		}
		this.setState(prevState => {
			return {
				...prevState,
				isSaved: true
			};
		});
		console.log('movie saved');
	}

	render() {
		const { detail } = this.state;
		if (this.state.loading) {
			return <Loader />;
		}

		return (
			<div className={styles.container}>
				<div className={styles.topButtons}>
					<p id={styles.back} onClick={() => this.props.history.goBack()}>
						&#8249;
					</p>
					<div className={styles.saved}>
						{this.state.isSaved ? <p>saved</p> : <p>save</p>}
					</div>
					{this.state.isSaved ? (
						<img
							onClick={this.saveMovie}
							id={styles.save}
							src={saveIconFilled}
							alt="save"
						/>
					) : (
						<img
							onClick={this.saveMovie}
							id={styles.save}
							src={saveIcon}
							alt="save"
						/>
					)}
				</div>
				<img
					className={styles.poster}
					src={`https://image.tmdb.org/t/p/w342${detail.poster_path}`}
					alt="poster"
				/>
				<h2 style={{ marginBottom: '30px' }}>{detail.title}</h2>

				<a
					className={styles.trailer}
					href={`https://www.youtube.com/watch?v=${this.state.trailer}`}
					target="_blank"
					rel="noopener norefferer"
				>
					Play Trailer
				</a>

				<p style={{ fontWeight: 'bold', color: 'brown', margin: '0' }}>
					Overview
				</p>
				<div className={styles.summary}>
					<div className={styles.summaryOne}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#313639"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="arcs"
						>
							<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
							<line x1="16" y1="2" x2="16" y2="6"></line>
							<line x1="8" y1="2" x2="8" y2="6"></line>
							<line x1="3" y1="10" x2="21" y2="10"></line>
						</svg>
						<p>
							<Moment format="DD MMM YYYY">{detail.release_date}</Moment>
						</p>
						{/* <p>{detail.release_date}</p> */}
					</div>
					<div className={styles.summaryOne}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#313639"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="arcs"
						>
							<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
						</svg>
						<p>{detail.vote_average}</p>
					</div>
					<div className={styles.summaryOne}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#313639"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="arcs"
						>
							<circle cx="12" cy="12" r="10"></circle>
							<polyline points="12 6 12 12 16 14"></polyline>
						</svg>
						<p>{detail.runtime} min.</p>
					</div>
					<div className={styles.summaryOne}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#313639"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="arcs"
						>
							<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
						</svg>
						<p>{this.state.language}</p>
					</div>
				</div>
				<p style={{ fontWeight: 'bold', color: 'brown', margin: '0' }}>
					Synopsis
				</p>
				<p className={styles.synopsis}>{detail.overview}</p>

				<p style={{ fontWeight: 'bold', color: 'brown', margin: '0' }}>Cast</p>
				<div className={styles.castContainer}>
					{this.state.cast.slice(0, 10).map(el => {
						return (
							<div className={styles.castItem} key={el.id}>
								<img
									className={styles.castImg}
									src={`https://image.tmdb.org/t/p/w185/${el.profile_path}`}
									alt="img"
								/>
								<p className={styles.castName}>{el.name}</p>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default MovieDetails;
