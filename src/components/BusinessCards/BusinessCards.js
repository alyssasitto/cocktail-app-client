import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import ReactPaginate from "react-paginate";

import { ThemeContext } from "../../context/theme.context";

import axios from "axios";

require("./BusinessCards.css");

const BusinessCards = (props) => {
	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem("auth_token");
	const navigate = useNavigate();

	const { theme } = useContext(ThemeContext);

	const [pageNumber, setPageNumber] = useState(0);
	const [favorites, setFavorites] = useState(null);
	const [favoritesIds, setFavoritesIds] = useState([]);
	const [showModal, setShowModal] = useState("");

	const businesses = props.businesses;
	const businessesPerPage = 10;
	const pagesVisited = pageNumber * businessesPerPage;
	const pageCount = Math.ceil(businesses.length / businessesPerPage);

	const viewBusiness = (id) => {
		navigate(`/business/${id}`);
	};

	const like = (e, business) => {
		if (!token) {
			console.log("must be signed in to like");

			props.setShowModal("show-modal");
		} else {
			e.target.parentNode.parentNode.classList.add("liked");

			const body = {
				business,
			};

			axios
				.post(`${API_URL}/like`, body, {
					headers: { token },
				})
				.then((response) => {
					console.log(response);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const unlike = (e, business) => {
		if (!token) {
			console.log("must be signed in to like");
		} else {
			e.target.parentNode.parentNode.classList.remove("liked");

			const body = {
				business,
			};

			axios
				.post(`${API_URL}/unlike`, body, {
					headers: { token },
				})
				.then((response) => {
					console.log(response);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	useEffect(() => {
		if (token) {
			axios
				.get(`${API_URL}/favorites`, {
					headers: { token },
				})
				.then((response) => {
					console.log(response);
					setFavorites(response.data.favorites);
					console.log("haaaaaa", response.data.favorites);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	console.log(favorites);

	const displayBusinesses = businesses
		.slice(pagesVisited, pagesVisited + businessesPerPage)
		.map((el, i) => {
			return (
				<div className={"card "} key={el.id}>
					<div
						className={`card-image  `}
						style={{ backgroundImage: "url(" + el.image_url + ")" }}
					>
						<button onClick={(e) => like(e, el)} className="like-btn">
							<img
								src="images/heart-outline.svg"
								className="heart-icon"
								alt="Heart icon"
							></img>
						</button>

						<button onClick={(e) => unlike(e, el)} className="unlike-btn">
							<img
								src="images/heart-filled.svg"
								className="heart-icon"
								alt="Heart icon"
							></img>
						</button>
					</div>
					<div className="card-details">
						<p className="card-name">{el.name}</p>
						<div className="card-rating-price">
							<p>⭐⭐⭐⭐</p>
							<p>•</p>
							<p>{el.price ? el.price : "$"}</p>
						</div>

						<div className="card-category">
							{el.categories.map((el) => {
								return (
									<Link to={`/search/${el.title}`} className="category">
										{el.title}
									</Link>
								);
							})}
						</div>

						<button onClick={() => viewBusiness(el.id)}>View details</button>
					</div>
				</div>
			);
		});

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	// ${
	// 					favorites && favorites.indexOf(el.id) !== -1 ? "liked" : ""
	// 				}

	return (
		<div className={"bussiness-cards " + showModal}>
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
