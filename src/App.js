import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";

// Components
import IsAnonymous from "./components/IsAnonymous";
import IsPrivate from "./components/IsPrivate";
import Navbar from "./components/Navbar/Navbar";

function App() {
	return (
		<div className="App">
			<Navbar />
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
			</Routes>
		</div>
	);
}

export default App;
