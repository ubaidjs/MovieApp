import React from 'react';
import spinner from '../assets/spinner.svg';

function Loader(props) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '50vh'
			}}
		>
			<img src={spinner} alt="" />
			<p style={{ fontStyle: 'italic', color: 'gray' }}>fetching...</p>
		</div>
	);
}
export default Loader;
