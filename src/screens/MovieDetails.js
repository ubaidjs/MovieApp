import React from 'react';
import Loader from '../components/Loader';

class MovieDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			detail: []
		};
	}

	async componentDidMount() {
		const data = await fetch(
			`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${process.env.REACT_APP_API_KEY}`
		);
		const dataJson = await data.json();
		this.setState({
			detail: dataJson
		});
	}

	render() {
		const { detail } = this.state;
		console.log(detail.release_date);

		if (!detail) {
			return (
				<div>
					<Loader></Loader>;
				</div>
			);
		} else {
			return (
				<div>
					<h1>{detail.title}</h1>
				</div>
			);
		}
	}
}

export default MovieDetails;
