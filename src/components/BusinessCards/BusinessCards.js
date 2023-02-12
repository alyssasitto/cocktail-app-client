import React, { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { ThemeContext } from "../../context/theme.context";

require("./BusinessCards.css");

const BusinessCards = (props) => {
	const { theme } = useContext(ThemeContext);

	const [pageNumber, setPageNumber] = useState(0);
	const businesses = props.businesses;

	const businessesPerPage = 10;
	const pagesVisited = pageNumber * businessesPerPage;
	const pageCount = Math.ceil(businesses.length / businessesPerPage);

	const displayBusinesses = businesses
		.slice(pagesVisited, pagesVisited + businessesPerPage)
		.map((el) => {
			return (
				<div className="card" key={el.id}>
					<div
						className="card-image"
						style={{ backgroundImage: "url(" + el.image_url + ")" }}
					></div>
					<div className="card-details">
						<p className="card-name">{el.name}</p>
						<div className="card-rating-price">
							<p>⭐⭐⭐⭐</p>
							<p>•</p>
							<p>{el.price ? el.price : "$"}</p>
						</div>

						<div className="card-category">
							{el.categories.map((el) => {
								return <p>{el.title}</p>;
							})}
						</div>

						<button>View details</button>
					</div>
				</div>
			);
		});

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	return (
		<div className="bussiness-cards">
			{displayBusinesses}
			<ReactPaginate
				previousLabel={
					theme === "" ? (
						<img
							src="images/left-arrow-black.svg"
							className="arrow"
							alt="Left arrow icon"
						></img>
					) : (
						<img
							src="images/left-arrow-white.svg"
							className="arrow"
							alt="Left arrow icon"
						></img>
					)
				}
				nextLabel={
					theme === "" ? (
						<img
							src="images/right-arrow-black.svg"
							className="arrow"
							alt="Right arrow icon"
						></img>
					) : (
						<img
							src="images/right-arrow-white.svg"
							className="arrow"
							alt="Right arrow icon"
						></img>
					)
				}
				pageCount={pageCount}
				onPageChange={changePage}
				containerClassName={"pagination-btns"}
				previousLinkClassName={"previous-btn"}
				nextLinkClassName={"next-btn"}
				disabledClassName={"disabled-btn"}
				activeClassName={"active-btn"}
			/>
		</div>
	);
};

export default BusinessCards;
