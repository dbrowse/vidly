import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "../common/pagination";
import Like from "../common/like";

class Movies extends Component {
	state = {
		movies: getMovies()
	};
	handleLiked = movie => {
		//1 clone the movies object
		const movies = [...this.state.movies];
		//find the index of this object
		const index = movies.indexOf(movie);
		//clone this new object
		movies[index] = { ...movies[index] };
		//toogle the liked movies
		movies[index].liked = !movies[index].liked;
		//set the new state to movies array
		this.setState({ movies });

		console.log("Handle liked event", movie);
	};

	handleDelete = movie => {
		//new state for the object
		const movies = this.state.movies.filter(m => m._id !== movie._id);
		this.setState({ movies });
	};
	render() {
		const { length: count } = this.state.movies;
		if (count === 0) return <p>There are no movies in DB.</p>;

		return (
			<React.Fragment>
				<span>Showing {count} movies in database </span>
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>Title</th>
							<th scope='col'>Genre</th>
							<th scope='col'>Stock</th>
							<th scope='col'>Rate</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.state.movies.map(movie => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like
										liked={movie.liked}
										onClick={() => this.handleLiked(movie)}
									/>
								</td>
								<td>
									<button
										onClick={() => this.handleDelete(movie)}
										type='button'
										className='btn btn-danger btn-sm'
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Pagination></Pagination>
			</React.Fragment>
		);
	}
}

export default Movies;
