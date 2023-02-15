import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

require("../Form.css");

export const Signup = () => {
	const API_URL = process.env.REACT_APP_API_URL;

	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
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

	const handleSubmit = (e) => {
		e.preventDefault();

		setIsLoading(true);

		const body = {
			name,
			email,
			password,
		};

		axios
			.post(`${API_URL}/signup`, body)
			.then(() => {
				navigate("/profile");
			})
			.catch((err) => {
				console.log(err.response.data.err);
				setErrMessage(err.response.data.err);
			});
	};

	return (
		<div className="form-page">
			<Navbar />

			<div className="form-content">
				<form onSubmit={handleSubmit} className="form">
					<div>
						<label htmlFor="name">Name:</label>
						<input type="text" name="name" value={name} onChange={handleName} />
					</div>
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
		</div>
	);
};

export default Signup;
