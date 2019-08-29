import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieItem.module.scss';

function MovieItem(props) {
	return (
		<div className={styles.movieItem}>
			<Link to={`/movie/${props.id}`}>
				<img src={`https://image.tmdb.org/t/p/w342${props.imgSrc}`} alt="" />
			</Link>
			<p className={styles.movieTitle}>{props.name}</p>
		</div>
	);
}

export default MovieItem;
