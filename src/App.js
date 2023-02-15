import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/auth.context";

// Pages
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import SingleBusiness from "./pages/SingleBusiness/SingleBusiness";
import SearchResults from "./pages/SearchResults/SearchResults";

// Components
import IsAnonymous from "./components/IsAnonymous";
import IsPrivate from "./components/IsPrivate";

require("./App.css");

function App() {
	const { theme } = useContext(AuthContext);

	return (
		<div className={"app " + theme}>
			<div className={theme}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/signup"
						element={
							<IsAnonymous>
								<Signup />
							</IsAnonymous>
						}
					/>
					<Route
						path="/login"
						element={
							<IsAnonymous>
								<Login />
							</IsAnonymous>
						}
					/>

					<Route
						path="/profile"
						element={
							<IsPrivate>
								<Profile />
							</IsPrivate>
						}
					/>

					<Route path="/search/:searchItem" element={<SearchResults />}></Route>

					<Route path="/business/:id" element={<SingleBusiness />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
