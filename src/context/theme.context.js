import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProviderWrapper(props) {
	const [theme, setTheme] = useState("");

	const toggleTheme = () => {
		if (theme === "") {
			setTheme("dark");
		} else {
			setTheme("");
		}
	};

	return (
		<ThemeContext.Provider value={{ toggleTheme, theme }}>
			{props.children}
		</ThemeContext.Provider>
	);
}

export { ThemeContext, ThemeProviderWrapper };
