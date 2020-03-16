import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
	const { itemsCount, pageSize, onPageChange, currentPage } = props;
	console.log(currentPage);

	const pagesCount = Math.ceil(itemsCount / pageSize);
	if (pagesCount === 1) return null;
	//create new array from 1 to pagesCount
	const pages = _.range(1, pagesCount + 1);
	return (
		<nav aria-label='Page navigation example'>
			<ul className='pagination'>
				{pages.map(page => (
					<li
						key={page}
						className={page === currentPage ? "page-item active" : "page-item"}
					>
						<a className='page-link' onClick={() => props.onPageChange(page)}>
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired
};

export default Pagination;
