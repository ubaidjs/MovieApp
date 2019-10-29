import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import homeIcon from '../assets/home.svg';
import categoryIcon from '../assets/list.svg';
import saveIcon from '../assets/saved.svg';

function NavBar() {
	return (
		<div className={styles.navbar}>
			<NavLink to="/">
				<img src={homeIcon} alt="" />
			</NavLink>
			<NavLink to="/category">
				<img src={categoryIcon} alt="" />
			</NavLink>
			<NavLink to="/saved">
				<img src={saveIcon} alt="" />
			</NavLink>
		</div>
	);
}

export default NavBar;
