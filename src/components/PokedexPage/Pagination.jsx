import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Pagination.css';

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
	const [pageNumbers, setPageNumbers] = useState();
	useEffect(() => {
		if (nPages) {
			const pages = [];
			for (let i = 1; i <= nPages; i++) {
				pages.push(i);
			}
			setPageNumbers(pages);
		}
	}, [nPages]);

	const goToNextPage = () => {
		if (currentPage < nPages) {
			setCurrentPage(currentPage + 1);
		} else {
			setCurrentPage(nPages);
		}
	};

	const goToPrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		} else {
			setCurrentPage(1);
		}
	};

	const goToSpecificPage = (n) => {
		setCurrentPage(n);
	};

	return (
		<nav>
			<ul className="pagination flex-container">
				<li className="page__item">
					<a className="page__link" onClick={goToPrevPage} href="#/pokedex">
						Previous
					</a>
				</li>

				<li className="page__item">
					<a className="page__link" onClick={goToPrevPage} href="#/pokedex">
						&hellip;
					</a>
				</li>
				{pageNumbers
					?.map((pgNumber) => (
						<li key={pgNumber} className={`page__item ${currentPage == pgNumber ? 'active' : ''} `}>
							<a onClick={() => goToSpecificPage(pgNumber)} className="page__link" href="#/pokedex">
								{pgNumber}
							</a>
						</li>
					))
					.slice(1, length - 1)}

				<li className="page__item">
					<a className="page__link" onClick={goToNextPage} href="#/pokedex">
						&hellip;
					</a>
				</li>
				<li className="page__item">
					<a className="page__link" onClick={goToNextPage} href="#/pokedex">
						Next
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
