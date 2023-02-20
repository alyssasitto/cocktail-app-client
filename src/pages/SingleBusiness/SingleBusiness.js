import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ThemeContext } from "../../context/theme.context";
import { AuthContext } from "../../context/auth.context";

import Navbar from "../../components/Navbar/Navbar";
import Slides from "../../components/Slides/Slides";
import Modal from "../../components/Modal/Modal";

import axios from "axios";

require("./SingleBusiness.css");

const SingleBusiness = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem("auth_token");
	const { theme } = useContext(ThemeContext);
	const { isLoggedIn, user } = useContext(AuthContext);
	const { id } = useParams();

	const navigate = useNavigate();

	const [business, setBusiness] = useState(null);
	const [favorited, setFavorited] = useState(false);
	const [favoriteIds, setFavoriteIds] = useState();
	const [showModal, setShowModal] = useState("");

	const [similar, setSimilar] = useState(
		JSON.parse(localStorage.getItem("similar"))
	);

	const [loading, setLoading] = useState(false);

	const back = () => {
		navigate(-1);
	};

	const like = () => {
		if (!token || !isLoggedIn) {
			setShowModal("show-modal");
		} else {
			setFavorited(true);

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

	const unlike = () => {
		setFavorited(false);

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
	};

	useEffect(() => {
		setLoading(true);

		axios
			.get(`${API_URL}/business/${id}`)
			.then((response) => {
				localStorage.setItem("business", JSON.stringify(response.data));
				setBusiness(response.data);

				return axios.post(`${API_URL}/search`, {
					searchItem: response.data.categories[0].alias,
					address: localStorage.getItem("address")
						? localStorage.getItem("address")
						: "USA",
					limit: "6",
				});
			})
			.then((response) => {
				setLoading(false);
				localStorage.setItem(
					"similar",
					JSON.stringify(response.data.businesses)
				);

				setSimilar(response.data.businesses);

				if (token) {
					return axios.get(`${API_URL}/favorites`, {
						headers: { token },
					});
				}
			})
			.then((response) => {
				const ids = response.data.favorites.map((el) => el.id);
				if (ids.indexOf(id) !== -1) {
					setFavorited(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	return (
		<div className={"business page " + theme + " " + showModal}>
			<Navbar />

			{showModal === "show-modal" && <Modal setShowModal={setShowModal} />}

			{loading && <p>loading....</p>}

			{!loading && business && (
				<div className="business-details">
					<div
						className="business-image"
						style={{ backgroundImage: "url(" + business.image_url + ")" }}
					>
						<button className="back-btn" onClick={() => back()}>
							<img
								src="images/left-arrow-white.svg"
								alt="Left arrow icon"
							></img>
						</button>

						<div className="favorite-btn">
							{!favorited ? (
								<button onClick={() => like()}>
									<img
										src="images/heart-outline.svg"
										className="Heart icon"
									></img>
								</button>
							) : (
								<button onClick={() => unlike()}>
									<img src="images/heart-filled.svg" alt="Heart icon"></img>
								</button>
							)}
						</div>
					</div>

					<div className="card-details">
						<h1 className="card-name">{business.name}</h1>
						<div className="card-rating-price">
							<p>⭐⭐⭐⭐</p>
							<p>•</p>
							<p>{business.price ? business.price : "$"}</p>
						</div>

						<div className="card-category">
							{business.categories.map((el) => {
								return <p>{el.title}</p>;
							})}
						</div>
						<div className="flex-helper">
							<div className="business-address">
								<p className="heading">
									{theme === "" ? (
										<img
											src="images/map-pin-black.svg"
											className="heading-icon"
											alt="Map pin icon"
										></img>
									) : (
										<img
											src="images/map-pin-white.svg"
											className="heading-icon"
											alt="Map pin icon"
										></img>
									)}
									<span>Address</span>
								</p>
								<div className="mt-helper">
									{business.location.display_address.map((el) => {
										return <p>{el}</p>;
									})}
								</div>
							</div>

							<div>
								<p className="heading">
									{theme === "" ? (
										<img
											src="images/phone-black.svg"
											className="heading-icon"
											alt="Phone icon"
										></img>
									) : (
										<img
											src="images/phone-white.svg"
											className="heading-icon"
											alt="Phone icon"
										></img>
									)}{" "}
									<span>Phone number</span>
								</p>
								<p className="business-number mt-helper">
									{business.display_phone}
								</p>
							</div>
						</div>
					</div>

					{similar && <Slides businesses={similar} />}
				</div>
			)}
		</div>
	);
};

export default SingleBusiness;
