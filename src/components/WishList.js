import React from 'react';
import icon from '../heart.svg';
import styles from './WishList.module.scss';

function Wishlist() {
	return (
		<div className={styles.logoContainer}>
			<img src={icon} alt="" className={styles.logo} />
		</div>
	);
}

export default Wishlist;
