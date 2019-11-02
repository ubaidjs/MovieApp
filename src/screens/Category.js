import React from 'react';
import { Link } from 'react-router-dom';
// import Loader from '../components/Loader';
import styles from './Category.module.scss';

class Category extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
	}

	async componentDidMount() {
		let response = await fetch(
			`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);
		let responseJson = await response.json();

		this.setState({
			list: responseJson
		});
	}

	render() {
		const { genres } = this.state.list;

		if (!genres) {
			return <></>;
		}
		return (
			<div>
				<h1 className={styles.categoryTitle}>Category</h1>
				<ul className={styles.genreList}>
					{genres.map(el => (
						<Link to={`/category/${el.name}/${el.id}/1`} key={el.id}>
							<li>
								{el.name} <span className={styles.chevron}>&#8250;</span>
							</li>
						</Link>
					))}
				</ul>
			</div>
		);
	}
}

export default Category;
