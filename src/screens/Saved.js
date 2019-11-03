import React, { useState } from 'react';
import SavedMovieItem from '../components/SavedMovieItem';
import styles from './Saved.module.scss';

const Saved = () => {
	const [localMovies, setLocalMovies] = useState(
		JSON.parse(localStorage.getItem('savedMovies'))
	);

	if (localMovies) {
		return (
			<>
				<h1 className={styles.heading}>Saved Movies</h1>
				<div className={styles.listContainer}>
					{localMovies.map(item => {
						return (
							<SavedMovieItem
								key={item.id}
								id={item.id}
								poster={item.poster_path}
								title={item.title}
								year={item.release_date.slice(0, 4)}
								localMovies={localMovies}
								setLocalMovies={setLocalMovies}
							/>
						);
					})}
				</div>
			</>
		);
	} else {
		return (
			<>
				<h1 className={styles.heading}>Saved Movies</h1>
				<p style={{ marginLeft: '30px' }}>No saved movies...</p>
			</>
		);
	}
};

export default Saved;
