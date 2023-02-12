import { useContext, useEffect, useState } from "react";

import { ThemeContext } from "../../context/theme.context";

import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import AddressBar from "../../components/AddressBar/AddressBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import BusinessCards from "../../components/BusinessCards/BusinessCards";

require("./Home.css");

const Home = () => {
	const API_URL = process.env.REACT_APP_API_URL;

	const { theme } = useContext(ThemeContext);

	const [searchItem, setSearchItem] = useState("");
	const [address, setAddress] = useState(
		localStorage.getItem("address") ? localStorage.getItem("address") : ""
	);
	const [addressActive, setAddressActive] = useState("");
	const [businesses, setBusinesses] = useState(null);
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState("");

	const handleSearchItem = (e) => {
		setSearchItem(e.target.value);
	};

	const handleAddress = (e) => {
		setAddress(e.target.value);
	};

	const toggleAddress = () => {
		if (addressActive === "") {
			setAddressActive("active");
		} else {
			setAddressActive("");
		}
	};

	const handleSearch = () => {
		if (!localStorage.getItem("address") || address === "") {
			setAddressActive("active error");
		} else {
			setLoading(true);

			setAddressActive("");

			axios
				.post(`${API_URL}/search`, {
					searchItem,
					address,
				})
				.then((response) => {
					setLoading(false);
					localStorage.setItem(
						"businesses",
						JSON.stringify(response.data.businesses)
					);
					setBusinesses(response.data.businesses);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	useEffect(() => {
		if (!localStorage.getItem("businesses")) {
			setLoading(true);

			axios
				.post(`${API_URL}/search`, {
					searchItem: "",
					address: "USA",
				})
				.then((response) => {
					setLoading(false);
					localStorage.setItem(
						"businesses",
						JSON.stringify(response.data.businesses)
					);
					setBusinesses(response.data.businesses);
				})
				.catch(() => {
					setErr("something went wrong");
				});
		} else {
			setBusinesses(JSON.parse(localStorage.getItem("businesses")));
		}
	}, []);

	console.log(businesses);
	return (
		<div className={"home page " + theme}>
			<Navbar />
			<div className="home-inputs">
				<SearchBar
					searchItem={searchItem}
					setSearchItem={setSearchItem}
					toggleAddress={toggleAddress}
					handleSearch={handleSearch}
					handleSearchItem={handleSearchItem}
				/>
				<AddressBar
					address={address}
					setAddress={setAddress}
					handleAddress={handleAddress}
					addressActive={addressActive}
				/>

				{businesses && !loading && <BusinessCards businesses={businesses} />}
			</div>
			{loading && <p>LOADING......</p>}
			{err && <p>{err}</p>}
		</div>
	);
};

export default Home;
