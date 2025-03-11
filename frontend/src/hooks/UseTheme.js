import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
const UseTheme=()=>{
    return useContext(ThemeContext);
}
export default UseTheme;