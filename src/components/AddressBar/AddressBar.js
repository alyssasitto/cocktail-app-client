import PlacesAutocomplete, {
	geocodeByAddress,
} from "react-places-autocomplete";

require("./AddressBar.css");

const AddressBar = (props) => {
	const handleSelect = async (value) => {
		const results = await geocodeByAddress(value);

		props.setAddress(results[0].formatted_address);

		localStorage.setItem("address", results[0].formatted_address);
	};

	return (
		<div>
			<PlacesAutocomplete
				value={props.address}
				onChange={props.setAddress}
				onSelect={handleSelect}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div className={"address-input " + props.addressActive}>
						<input {...getInputProps({ placeholder: "Enter address..." })} />
						<div className="address-container">
							{loading ? <p>loading...</p> : null}
							{suggestions.map((suggestion) => {
								const style = {
									backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
								};

								return (
									<div
										className="address-item"
										{...getSuggestionItemProps(suggestion, { style })}
									>
										{suggestion.description}
									</div>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		</div>
	);
};

export default AddressBar;
