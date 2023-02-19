import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/theme.context";

require("./Modal.css");

const Modal = (props) => {
	const { theme } = useContext(ThemeContext);

	const exit = () => {
		props.setShowModal("");
	};

	return (
		<div className={"modal " + theme}>
			<button onClick={() => exit()}>
				{theme === "" ? (
					<img src="images/close-logo-black.svg" className="Exit icon"></img>
				) : (
					<img src="images/close-logo-white.svg" alt="Exit icon"></img>
				)}
			</button>

			<h1>
				Join <span>Your Travel Companion</span> to like and save businesses.
			</h1>
			<div className="buttons">
				<button>
					<Link to="/signup">Signup</Link>
				</button>
				<button>
					<Link to="/login">Login</Link>
				</button>
			</div>
		</div>
	);
};

export default Modal;
