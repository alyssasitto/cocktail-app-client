import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";

require("./Navbar.css");

const Navbar = () => {
	const { isLoggedIn, logout } = useContext(AuthContext);

	return (
		<nav>
			{isLoggedIn && (
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/translator">Translator</Link>
					</li>
					<li>
						<Link to="/profile">Profile</Link>
					</li>
					<li>
						<button onClick={() => logout()}>Logout</button>
					</li>
				</ul>
			)}

			{!isLoggedIn && (
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/translator">Translator</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/signup">Signup</Link>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
