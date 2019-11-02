/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import saveIcon from '../assets/saved.svg';
import calendarIcon from '../assets/calendar.svg';
import starIcon from '../assets/star.svg';
import languageIcon from '../assets/language.png';
import watchIcon from '../assets/watch.svg';
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
		this.setState({
			detail: detailJson,
			language: detailJson.spoken_languages[0].name,
			cast: castJson.cast,
			trailer: trailerJson ? trailerJson.results[0].key : '',
			loading: false
		});
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
					<img id={styles.save} src={saveIcon} alt="save" />
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
						<img src={calendarIcon} alt="calendarIcon" />
						<p>{detail.release_date}</p>
					</div>
					<div className={styles.summaryOne}>
						<img src={starIcon} alt="starIcon" />
						<p>{detail.vote_average}</p>
					</div>
					<div className={styles.summaryOne}>
						<img src={watchIcon} alt="watchIcon" />
						<p>{detail.runtime} min.</p>
					</div>
					<div className={styles.summaryOne}>
						<img src={languageIcon} alt="languageIcon" />
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
