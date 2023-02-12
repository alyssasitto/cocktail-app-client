import { useContext } from "react";

import { ThemeContext } from "../../context/theme.context";

const SearchBar = (props) => {
	const { theme } = useContext(ThemeContext);

	return (
		<div className="place-input">
			<input
				type="text"
				value={props.searchItem}
				onChange={props.handleSearchItem}
				placeholder="Food, groceries, malls, etc..."
			/>

			<div className="input-btns">
				<button>
					{theme === "" ? (
						<img
							src="images/map-pin-black.svg"
							onClick={() => props.toggleAddress()}
							alt="Map pin icon"
						></img>
					) : (
						<img
							src="images/map-pin-white.svg"
							onClick={() => props.toggleAddress()}
							alt="Map pin icon"
						></img>
					)}
				</button>

				<button className="search-btn ">
					{theme === "" ? (
						<img
							src="images/search-icon-black.svg"
							onClick={() => props.handleSearch()}
							alt="Search icon"
						></img>
					) : (
						<img
							src="images/search-icon-white.svg"
							onClick={() => props.handleSearch()}
							alt="Search icon"
						></img>
					)}
				</button>
			</div>
		</div>
	);
};

export default SearchBar;
