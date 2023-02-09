import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

export const Login = () => {
	const API_URL = process.env.REACT_APP_API_URL;

	const { storeItems } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errMessage, setErrMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	// Function for when a user signs in
	const handleSubmit = (e) => {
		// Prevent the page from reloading
		e.preventDefault();

		// Set loading state to true
		setIsLoading(true);

		const body = {
			email,
			password,
		};

		// Make request to login route and send body with email and password that user typed in
		axios
			.post(`${API_URL}/login`, body)
			.then((response) => {
				// Use the storeItems() function to store the authToken and refreshToken
				storeItems(response.data.authToken, response.data.refreshToken);
				// Reload the page
				window.location.reload();
			})
			.catch((err) => {
				setErrMessage(err.response.data.err);
			});
	};

	return (
		<div>
			{isLoading && <p>loading...</p>}
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="text"
						name="email"
						value={email}
						onChange={handleEmail}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={handlePassword}
					/>
				</div>
				<button type="submit">submit</button>
			</form>

			{errMessage && <p>{errMessage}</p>}

			<a href="/">Home</a>
		</div>
	);
};

export default Login;
