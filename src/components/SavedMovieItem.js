import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SavedMovieItem.module.scss';

const SavedMovieItem = ({
	id,
	poster,
	title,
	year,
	localMovies,
	setLocalMovies
}) => {
	return (
		<div className={styles.container}>
			<Link className={styles.link} to={`/movie/${id}`}>
				<img src={`https://image.tmdb.org/t/p/w342${poster}`} alt="poster" />
				<div className={styles.nameyear}>
					<h4>{title}</h4>
					<p>{year}</p>
				</div>
			</Link>

			<svg
				onClick={() => {
					let newArr = localMovies.filter(el => el.id !== id);
					localStorage.setItem('savedMovies', JSON.stringify(newArr));
					setLocalMovies(newArr);
				}}
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#d0021b"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="arcs"
			>
				<polyline points="3 6 5 6 21 6"></polyline>
				<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
				<line x1="10" y1="11" x2="10" y2="17"></line>
				<line x1="14" y1="11" x2="14" y2="17"></line>
			</svg>
		</div>
	);
};

export default SavedMovieItem;
