import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieItem.module.scss';

function MovieItem({ id, name, imgSrc, year }) {
	return (
		<div className={styles.movieItem}>
			<Link to={`/movie/${id}`}>
				<img src={`https://image.tmdb.org/t/p/w342${imgSrc}`} alt="" />
			</Link>
			<p className={styles.movieTitle}>
				{name} ({year.slice(0, 4)})
			</p>
		</div>
	);
}

export default MovieItem;
