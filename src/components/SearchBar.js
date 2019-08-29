import React from 'react';
import styles from './SearchBar.module.scss';

function SearchBar() {
	return (
		<div>
			<input type="search" placeholder="Search" className={styles.searchBar} />
		</div>
	);
}

export default SearchBar;
