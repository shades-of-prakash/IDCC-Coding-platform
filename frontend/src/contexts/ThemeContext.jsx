import { createContext,useEffect,useState } from "react";

export const ThemeContext=createContext()

const ThemeProvider=({children})=>{

    const getPreferredTheme = () => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) return storedTheme;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    const [theme, setTheme] = useState(getPreferredTheme());

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
            if (!localStorage.getItem("theme")) {
                setTheme(e.matches ? "dark" : "light");
            }
        };

        if (!localStorage.getItem("theme")) {
            setTheme(mediaQuery.matches ? "dark" : "light");
        }

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
    
}

export default ThemeProvider