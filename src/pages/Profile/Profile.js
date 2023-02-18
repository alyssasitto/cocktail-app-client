import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../context/auth.context";
import Navbar from "../../components/Navbar/Navbar";

import axios from "axios";

require("./Profile.css");

const Profile = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const token = localStorage.getItem("auth_token");

	const { user } = useContext(AuthContext);

	const [favorites, setFavorites] = useState(null);
	const [err, setErr] = useState("");

	useEffect(() => {
		axios
			.get(`${API_URL}/favorites`, {
				headers: { token },
			})
			.then((response) => {
				setFavorites(response.data.favorites);
			})
			.catch((err) => {
				setErr(err.response.data.err);
			});
	}, []);

	console.log(favorites);

	return (
		<div className="profile-page">
			<Navbar />

			<div className="profile-page-content">
				<h1>Hello {user.name[0].toUpperCase() + user.name.slice(1)}</h1>

				<div>
					<h2>Favorites</h2>
					{favorites.length === 0 && <p>no favorites yet</p>}
				</div>
			</div>
		</div>
	);
};

export default Profile;
