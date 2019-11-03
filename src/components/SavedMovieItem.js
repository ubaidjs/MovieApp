import React from 'react';
import deleteBtn from '../assets/delete-button.svg';
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
			<img src={`https://image.tmdb.org/t/p/w342${poster}`} alt="poster" />
			<div className={styles.nameyear}>
				<h4>{title}</h4>
				<p>{year}</p>
			</div>
			<img
				onClick={() => {
					let newArr = localMovies.filter(el => el.id !== id);
					localStorage.setItem('savedMovies', JSON.stringify(newArr));
					setLocalMovies(newArr);
				}}
				className={styles.button}
				src={deleteBtn}
				alt="delete"
			/>
		</div>
	);
};

export default SavedMovieItem;
