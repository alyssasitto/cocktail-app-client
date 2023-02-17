import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/auth.context";
import { ThemeContext } from "../../context/theme.context";
import axios from "axios";

require("../Form.css");

export const Login = () => {
	const API_URL = process.env.REACT_APP_API_URL;

	const location = useLocation();
	const successMessage = location.state ? location.state.message : "";

	const { storeItems } = useContext(AuthContext);
	const { theme } = useContext(ThemeContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [inputType, setInputType] = useState("password");
	const [errMessage, setErrMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	// Function for showing and hiding the password
	const toggleInputType = () => {
		if (inputType === "password") {
			setInputType("text");
		} else {
			setInputType("password");
		}
	};

	// Function for when a user signs in
	const handleSubmit = (e) => {
		// Prevent the page from reloading
		e.preventDefault();

		if (email === "" || password === "") {
			setErrMessage("Please enter an email and password");
		} else {
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
					setIsLoading(false);
					setErrMessage(err.response.data.err);
				});
		}
	};

	return (
		<div className="form-page">
			<Navbar />

			{isLoading && <p>loading...</p>}

			{!isLoading && (
				<div className="form-content">
					<h1>Login</h1>

					<form onSubmit={handleSubmit} className="form">
						<div>
							<label htmlFor="email">Email</label>
							<div className="input-container">
								<input
									type="text"
									name="email"
									value={email}
									onChange={handleEmail}
								/>
								{theme === "" ? (
									<img
										src="images/envelope-black.svg"
										alt="Envelope icon"
									></img>
								) : (
									<img
										src="images/envelope-white.svg"
										alt="Envelope icon"
									></img>
								)}
							</div>
						</div>
						<div>
							<label htmlFor="password">Password</label>
							<div className="input-container">
								<input
									type={inputType}
									name="password"
									value={password}
									onChange={handlePassword}
								/>
								{theme === "" ? (
									<img src="images/lock-black.svg" alt="Lock icon"></img>
								) : (
									<img src="images/lock-white.svg" alt="Lock icon"></img>
								)}

								<button type="button" onClick={() => toggleInputType()}>
									{inputType === "password" &&
										(theme === "" ? (
											<img
												src="images/eye-black.svg"
												className="eye-icon"
												alt="Eye icon"
											></img>
										) : (
											<img
												src="images/eye-white.svg"
												className="eye-icon"
												alt="Eye icon"
											></img>
										))}

									{inputType === "text" &&
										(theme === "" ? (
											<img
												src="images/eye-slash-black.svg"
												className="eye-icon"
												alt="Eye icon"
											></img>
										) : (
											<img
												src="images/eye-slash-white.svg"
												className="eye-icon"
												alt="Eye icon"
											></img>
										))}
								</button>
							</div>
						</div>

						{successMessage && (
							<p className="success-message">{successMessage}</p>
						)}
						{errMessage && <p className="err-message">{errMessage}</p>}

						<button type="submit" className="form-btn">
							Login
						</button>
					</form>

					<Link to="/signup" className="link">
						Don't have an account yet? <span>Signup here</span>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Login;
