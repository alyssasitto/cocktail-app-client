import axios from "axios";

const Home = () => {
	const API_URL = process.env.REACT_APP_API_URL;

	const token = localStorage.getItem("auth_token");

	return (
		<div>
			<a href="/signup">Signup</a>
			<a href="/login">Login</a>
		</div>
	);
};

export default Home;
