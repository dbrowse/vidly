import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
	state = {
		movies: getMovies()
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
			</React.Fragment>
		);
	}
}

export default Movies;
