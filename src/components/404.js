import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div>
			<h2>Nothing here...</h2>
			<Link to="/">
				<button
					style={{
						position: 'absolute',
						left: '50%',
						transform: 'translateX(-50%)',
						backgroundColor: 'white',
						border: '1px solid green',
						padding: '5px'
					}}
				>
					Back to Home
				</button>
			</Link>
		</div>
	);
};

export default NotFound;
