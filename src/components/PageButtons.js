import React from 'react';
import styles from './PageButtons.module.scss';

const PageButtons = props => {
	return (
		<div className={styles.buttons}>
			{props.page === 1 ? (
				<button disabled>Prev</button>
			) : (
				<button onClick={() => props.handlePageNum('prev')}>Prev</button>
			)}
			<p>{props.page}</p>
			<button onClick={() => props.handlePageNum('next')}>Next</button>
		</div>
	);
};

export default PageButtons;
