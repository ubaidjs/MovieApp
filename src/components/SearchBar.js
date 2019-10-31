import React from 'react';
import styles from './SearchBar.module.scss';

function SearchBar() {
	return (
		<div style={{ margin: '0 10px' }}>
			<input type="search" placeholder="Search" className={styles.searchBar} />
		</div>
	);
}

export default SearchBar;
