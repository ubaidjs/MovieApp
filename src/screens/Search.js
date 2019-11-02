import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import MovieItem from '../components/MovieItem';
import Loader from '../components/Loader';
import styles from './Search.module.scss';

const Search = ({ match }) => {
	const [result, setResult] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Axios.get(
			`https://api.themoviedb.org/3/search/movie?api_key=73f48f5f09fbac24a3582ebe2607082f&language=en-US&query=${match.params.query}&page=1&include_adult=false`
		).then(data => {
			setResult(data.data.results);
			setLoading(false);
		});
	}, [match.params.query]);

	if (loading) {
		return <Loader />;
	}

	if (!result.length) {
		return <h3>No result found</h3>;
	}

	return (
		<>
			<h3 className={styles.resultText}>
				Search results for <i>{match.params.query.replace('+', ' ')}</i>
			</h3>
			<div className={styles.container}>
				{result.map(item => {
					return (
						<div className={styles.movieContainer} key={item.id}>
							<MovieItem
								name={item.title}
								imgSrc={item.poster_path}
								id={item.id}
								year={item.release_date}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Search;
