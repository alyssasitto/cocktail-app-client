import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import { ThemeContext } from "../../context/theme.context";

require("./Navbar.css");

const Navbar = () => {
	const { toggleTheme, theme } = useContext(ThemeContext);
	const { isLoggedIn, logout } = useContext(AuthContext);
	const [menu, setMenu] = useState("");

	const toggleMenu = () => {
		if (menu === "") {
			setMenu("active");
		} else {
			setMenu("");
		}
	};

	return (
		<nav className={theme + " " + menu}>
			<Link className="site-logo" href="/home">
				{theme === "" && (
					<img src="images/site-logo-black.png" alt="Site logo"></img>
				)}
				{theme === "dark" && (
					<img src="images/site-logo-white.png" alt="Site logo"></img>
				)}
			</Link>

			<div className="btns">
				<button className="theme-btn" onClick={() => toggleTheme()}>
					{theme === "" && <img src="images/moon.svg"></img>}
					{theme === "dark" && <img src="images/sun.svg"></img>}
				</button>

				<button className="nav-btns">
					<div className="menu-icons" onClick={() => toggleMenu()}>
						{theme === "" && (
							<img src="images/menu-logo-black.svg" alt="Menu icon"></img>
						)}
						{theme === "dark" && (
							<img src="images/menu-logo-white.svg" alt="Menu icon"></img>
						)}
					</div>

					<div className="close-icons" onClick={() => toggleMenu()}>
						{theme === "" && (
							<img src="images/close-logo-black.svg" alt="Clost icon"></img>
						)}
						{theme === "dark" && (
							<img src="images/close-logo-white.svg" alt="Close icon"></img>
						)}
					</div>
				</button>
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
			</div>
		</nav>
	);
};

export default Navbar;
