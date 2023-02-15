import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import BusinessCards from "../../components/BusinessCards/BusinessCards";

import { ThemeContext } from "../../context/theme.context";

import axios from "axios";

require("./SearchResults.css");

const SearchResults = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();

	const { theme } = useContext(ThemeContext);

	const address = localStorage.getItem("address")
		? localStorage.getItem("address")
		: "USA";

	const { searchItem } = useParams();

	const [businesses, setBusinesses] = useState(null);
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState("");

	const back = () => {
		navigate(-1);
	};

	useEffect(() => {
		if (!localStorage.getItem("search-items")) {
			axios
				.post(`${API_URL}/search`, {
					searchItem,
					address,
				})
				.then((response) => {
					setLoading(false);
					localStorage.setItem(
						"search-items",
						JSON.stringify(response.data.businesses)
					);

					setBusinesses(response.data.businesses);
				})
				.catch((err) => {
					console.log(err);
					setErr("something went wrong");
				});
		} else {
			setLoading(false);
			setBusinesses(JSON.parse(localStorage.getItem("search-items")));
		}
	}, []);

	return (
		<div className={"search-results page " + theme}>
			<Navbar />

			<button onClick={() => back()} className="back">
				{theme === "" ? (
					<img src="images/left-arrow-black.svg"></img>
				) : (
					<img src="images/left-arrow-white.svg"></img>
				)}
			</button>

			{loading && <p>loading...</p>}

			{businesses && !loading && <BusinessCards businesses={businesses} />}

			{err && <p>{err}</p>}
		</div>
	);
};

export default SearchResults;
