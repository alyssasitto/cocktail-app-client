import { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { ThemeContext } from "../../context/theme.context";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

require("../Form.css");

export const Signup = () => {
	const API_URL = process.env.REACT_APP_API_URL;

	const navigate = useNavigate();

	const { theme } = useContext(ThemeContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [inputType, setInputType] = useState("password");
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errMessage, setErrMessage] = useState("");

	const handleName = (e) => {
		setName(e.target.value);
	};

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

	const handleSubmit = (e) => {
		e.preventDefault();

		if (name === "" || email === "" || password === "") {
			setErrMessage("Please enter a name, email, and password");
		} else {
			setIsLoading(true);

			const body = {
				name,
				email,
				password,
			};

			axios
				.post(`${API_URL}/signup`, body)
				.then((response) => {
					setIsLoading(false);
					setSuccessMessage(response.data.message);
					navigate("/login", {
						state: { message: "User created please login" },
					});
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
					<h1>Signup</h1>
					<form onSubmit={handleSubmit} className="form">
						<div>
							<label htmlFor="name">Name</label>
							<div className="input-container">
								<input
									type="text"
									name="name"
									value={name}
									onChange={handleName}
								/>

								{theme === "" ? (
									<img src="images/user-black.svg" alt="User icon"></img>
								) : (
									<img src="images/user-white.svg" alt="User icon"></img>
								)}
							</div>
						</div>
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
							Signup
						</button>
					</form>

					<Link to="/login" className="link">
						Already have an account? <span>Login here</span>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Signup;
