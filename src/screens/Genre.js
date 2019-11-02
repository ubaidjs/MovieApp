import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Genre.module.scss';
import Loader from '../components/Loader';
import MovieItem from '../components/MovieItem';
import PageButtons from '../components/PageButtons';

const Genre = ({ match }) => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(
				`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${match.params.id}&sort_by=popularity.desc&page=${match.params.page}`
			)
			.then(data => {
				// setMovies([]);
				setMovies(data.data.results);
				setLoading(false);
			});
		window.scrollTo(0, 0);
	}, [match.params.id, match.params.page]);

	if (loading) {
		return <Loader />;
	} else {
		return (
			<div>
				<h1 className={styles.genreTitle}>{match.params.genrename} Movies</h1>
				<div className={styles.moviesContainer}>
					{movies.map(movie => {
						return (
							<div style={{ margin: '10px 17px' }} key={movie.id}>
								<MovieItem
									id={movie.id}
									name={movie.title}
									imgSrc={movie.poster_path}
									year={movie.release_date}
								/>
							</div>
						);
					})}
				</div>
				<PageButtons
					page={match.params.page}
					genre={match.params.genrename}
					genreId={match.params.id}
				/>
			</div>
		);
	}
};

export default Genre;
