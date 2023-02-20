import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
	const API_URL = process.env.REACT_APP_API_URL;

	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Store the authToken, refreshToken, and a timestamp with the current time to local storage
	const storeItems = (authToken, refreshToken) => {
		localStorage.setItem("auth_token", authToken);
		localStorage.setItem("refresh_token", refreshToken);
		localStorage.setItem("auth_token_timestamp", Date.now());
	};

	// Function for checking if the auth token has expired, returns true or false
	const hasTokenExpired = () => {
		// Check if

		// Grab the refresh token and timestamp from local storage
		const refreshToken = localStorage.getItem("refresh_token");
		const timestamp = localStorage.getItem("auth_token_timestamp");

		// If either the refresh token or timestamp are a falsy value return false
		if (!refreshToken || !timestamp) {
			return false;
		}

		// Calculate the time passsed by subtracting the current time from the timestamp from local storage
		const timePassed = Date.now() - Number(timestamp);

		// Check if the time passed in milliseconds is greater than 3600000 milliseconds(1 hour)
		return timePassed > 3600000;
	};

	// Log user out by removing everything from local storage and reload page
	const logout = () => {
		localStorage.removeItem("auth_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("auth_token_timestamp");

		window.location = window.location.origin;
	};

	// Function for refreshing token
	const refreshToken = () => {
		// If the auth token or the refresh token are a falsy value call the logout function
		if (
			!localStorage.getItem("auth_token") ||
			!localStorage.getItem("refresh_token")
		) {
			logout();
		} else {
			// If the auth token and refresh token are truthy then make a request to the refresh token route
			axios
				.get(
					`${API_URL}/refresh?refresh_token=${localStorage.getItem(
						"refresh_token"
					)}`
				)
				.then((response) => {
					// Store the new auth token in local storage along with a new timestamp
					localStorage.setItem("auth_token", response.data.authToken);
					localStorage.setItem("auth_token_timestamp", Date.now());
					window.location.reload();
				})
				.catch(() => {
					logout();
				});
		}
	};

	// Function that will be called on every reload
	const authenticateUser = () => {
		// Grab the auth token from local storage
		const token = localStorage.getItem("auth_token");

		// If the hasTokenExpired() function returns true then call the refresh token function
		if (hasTokenExpired()) {
			return refreshToken();
		}

		// If the token returns a falsy value then set loading/logged in stats false and user to null
		if (!token) {
			setIsLoading(false);
			setIsLoggedIn(false);
			setUser(null);
		} else {
			// If the token returns a truthy value then make a request to the verify route with the auth token
			axios
				.get(`${API_URL}/verify`, {
					headers: { token },
				})
				.then((response) => {
					const user = response.data;

					// Set logged in state to true, loading to false, and the user to the user to the data returned
					setIsLoggedIn(true);
					setIsLoading(false);
					setUser(user);
				})
				.catch(() => {
					// If the request fails set loading/logged in to false and user to null
					setIsLoading(false);
					setIsLoggedIn(false);
					setUser(null);
				});
		}
	};

	useEffect(() => {
		// On every reload call the authenticateUser() function to check if the auth token is valid
		authenticateUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{ storeItems, user, isLoading, isLoggedIn, logout }}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProviderWrapper };
