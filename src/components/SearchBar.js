import React from 'react';
import styles from './SearchBar.module.scss';

function SearchBar({ handleSearchTerm, handleSearchSubmit }) {
	return (
		<div style={{ margin: '0 10px' }}>
			<form onSubmit={handleSearchSubmit}>
				<input
					type="search"
					placeholder="Search movies"
					className={styles.searchBar}
					onChange={handleSearchTerm}
				/>
			</form>
		</div>
	);
}

export default SearchBar;
