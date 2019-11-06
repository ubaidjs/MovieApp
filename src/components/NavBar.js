import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';

function NavBar() {
	return (
		<div className={styles.navbar}>
			<NavLink exact to="/" activeClassName={styles.active}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#313639"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="arcs"
				>
					<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
					<polyline points="9 22 9 12 15 12 15 22"></polyline>
				</svg>
			</NavLink>
			<NavLink to="/category" activeClassName={styles.active}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#313639"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="arcs"
				>
					<line x1="8" y1="6" x2="21" y2="6"></line>
					<line x1="8" y1="12" x2="21" y2="12"></line>
					<line x1="8" y1="18" x2="21" y2="18"></line>
					<line x1="3" y1="6" x2="3" y2="6"></line>
					<line x1="3" y1="12" x2="3" y2="12"></line>
					<line x1="3" y1="18" x2="3" y2="18"></line>
				</svg>
			</NavLink>
			<NavLink to="/saved" activeClassName={styles.active}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#313639"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="arcs"
				>
					<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
				</svg>
			</NavLink>
		</div>
	);
}

export default NavBar;
