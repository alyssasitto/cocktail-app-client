import { useContext, useState } from "react";

import { ThemeContext } from "../../context/theme.context";

import Navbar from "../../components/Navbar/Navbar";
import AddressBar from "../../components/AddressBar/AddressBar";

require("./Home.css");

const Home = () => {
	const { theme } = useContext(ThemeContext);

	const [searchItem, setSearchItem] = useState("");
	const [address, setAddress] = useState(
		localStorage.getItem("address") ? localStorage.getItem("address") : ""
	);
	const [addressActive, setAddressActive] = useState("");

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
			setAddressActive("");
		}
	};

	return (
		<div className={"home page " + theme}>
			<Navbar />
			<div className="home-inputs">
				<div className="place-input">
					<input
						type="text"
						value={searchItem}
						onChange={handleSearchItem}
						placeholder="Food, groceries, malls, etc..."
					/>

					<div className="input-btns">
						<button>
							{theme === "" ? (
								<img
									src="images/map-pin-black.svg"
									onClick={() => toggleAddress()}
									alt="Map pin icon"
								></img>
							) : (
								<img
									src="images/map-pin-white.svg"
									onClick={() => toggleAddress()}
									alt="Map pin icon"
								></img>
							)}
						</button>

						<button className="search-btn ">
							{theme === "" ? (
								<img
									src="images/search-icon-black.svg"
									onClick={() => handleSearch()}
									alt="Search icon"
								></img>
							) : (
								<img
									src="images/search-icon-white.svg"
									onClick={() => handleSearch()}
									alt="Search icon"
								></img>
							)}
						</button>
					</div>
				</div>
				<AddressBar
					address={address}
					setAddress={setAddress}
					handleAddress={handleAddress}
					addressActive={addressActive}
				/>
			</div>
		</div>
	);
};

export default Home;
