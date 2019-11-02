import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PageButtons.module.scss';

const PageButtons = props => {
	const { page } = props;
	return (
		<div className={styles.buttons}>
			{page === '1' ? (
				<button disabled>Prev Page</button>
			) : (
				<Link to={`/category/${props.genre}/${props.genreId}/${page - 1}`}>
					<button>Prev Page</button>
				</Link>
			)}
			<Link
				to={`/category/${props.genre}/${props.genreId}/${parseInt(page) + 1}`}
			>
				<button>Next Page</button>
			</Link>
		</div>
	);
};

export default PageButtons;
