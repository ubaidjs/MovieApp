import React from 'react';
import Swiper from 'react-id-swiper';
import MovieItem from './MovieItem';
import styles from './MovieSlider.module.scss';

function MovieSlider(props) {
	const params = {
		freeMode: true,
		slidesPerView: 'auto',
		spaceBetween: 30
	};
	return (
		<div className={styles.movieSlider}>
			<p className={styles.categoryTitle}>{props.title}</p>

			<Swiper {...params}>
				{props.results.map(item => {
					return (
						<div key={item.id}>
							<MovieItem
								name={item.title}
								imgSrc={item.poster_path}
								id={item.id}
							/>
						</div>
					);
				})}
			</Swiper>
		</div>
	);
}

export default MovieSlider;
