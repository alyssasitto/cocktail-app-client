import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth.context";

const IsPrivate = (props) => {
	const { isLoggedIn, isLoading } = useContext(AuthContext);

	if (isLoading) {
		return <p>loading...</p>;
	}

	if (!isLoggedIn) {
		return <Navigate to="/login" />;
	} else {
		return props.children;
	}
};

export default IsPrivate;
