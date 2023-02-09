import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const IsAnonymous = (props) => {
	const { isLoggedIn, isLoading } = useContext(AuthContext);

	// Check is the isLoading state is true and if it is return loading gif
	if (isLoading) {
		return <p>loading...</p>;
	}

	if (isLoggedIn) {
		// If isLoggedIn is false then navigate to the profile page
		return <Navigate to="/profile" />;
	} else {
		// If isLoggedIn is true then return the children of component
		return props.children;
	}
};

export default IsAnonymous;
