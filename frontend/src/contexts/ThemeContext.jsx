import React, { useEffect, useState, createContext, useContext } from "react";

export const ThemeContext = createContext({
	theme: "light",
	toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("light");

	const applyTheme = (newTheme) => {
		setTheme(newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		localStorage.setItem("theme", newTheme);
		applyTheme(newTheme);
		localStorage.setItem("theme", newTheme);
	};

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme");
		if (storedTheme === "light" || storedTheme === "dark") {
			applyTheme(storedTheme);
		} else {
			// No stored preference — use system preference
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const systemTheme = mediaQuery.matches ? "dark" : "light";
			applyTheme(systemTheme);
			localStorage.setItem("theme", systemTheme);
		}

		// Watch system preference changes only if no user preference is stored
		const handleChange = (e) => {
			if (!localStorage.getItem("theme")) {
				const newTheme = e.matches ? "dark" : "light";
				applyTheme(newTheme);
				localStorage.setItem("theme", newTheme);
			}
		};

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
