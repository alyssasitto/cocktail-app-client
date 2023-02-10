import { useContext } from "react";
import { ThemeContext } from "../../context/theme.context";

require("./Home.css");

const Home = () => {
	const API_URL = process.env.REACT_APP_API_URL;

	const token = localStorage.getItem("auth_token");

	const { theme } = useContext(ThemeContext);

	return (
		<div className={"page "}>
			<p>ffledk</p>
		</div>
	);
};

export default Home;
