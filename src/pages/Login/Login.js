import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

export const Login = () => {
	const API_URL = process.env.REACT_APP_API_URL;

	const { storeItems } = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errMessage, setErrMessage] = useState("");

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const body = {
			email,
			password,
		};

		axios
			.post(`${API_URL}/login`, body)
			.then((response) => {
				storeItems(response.data.authToken, response.data.refreshToken);
			})
			.catch((err) => {
				setErrMessage(err.response.data.err);
			});
	};

	return (
		<div>
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