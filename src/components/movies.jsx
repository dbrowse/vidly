import React, { Component } from "react";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import Like from "../common/like";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1
	};

	componentDidMount() {
		const genres = [{ name: "All Genres" }, ...getGenres()];

		this.setState({ movies: getMovies(), genres: genres });
	}

	//this method will recieve the new page number
	handleOnPageChange = page => {
		this.setState({ currentPage: page });
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
	};

	handleDelete = movie => {
		//new state for the object
		const movies = this.state.movies.filter(m => m._id !== movie._id);
		this.setState({ movies });
	};

	handleGenreSelect = genre => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	render() {
		const { length: count } = this.state.movies;
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			selectedGenre
		} = this.state;

		if (count === 0) return <p>There are no movies in DB.</p>;

		// if selected genre is truty will get allMovies and filter them by genre
		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter(m => m.genre._id === selectedGenre._id)
				: allMovies;

		const movies = paginate(filtered, currentPage, pageSize);

		return (
			<div className='row'>
				<div className='col-3'>
					<ListGroup
						//all properties that we need to extract later
						items={this.state.genres}
						selectedItem={this.state.selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>
				<div className='col'>
					<span>Showing {filtered.length} movies in database </span>
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
							{movies.map(movie => (
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
					<Pagination
						itemsCount={filtered.length}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handleOnPageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
