import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import homeIcon from '../assets/home.svg';
import categoryIcon from '../assets/list.svg';
import saveIcon from '../assets/saved.svg';

function NavBar() {
	return (
		<div className={styles.navbar}>
			<Link to="/">
				<img src={homeIcon} alt="" />
			</Link>
			<Link to="/category">
				<img src={categoryIcon} alt="" />
			</Link>
			<Link to="/saved">
				<img src={saveIcon} alt="" />
			</Link>
		</div>
	);
}

export default NavBar;
