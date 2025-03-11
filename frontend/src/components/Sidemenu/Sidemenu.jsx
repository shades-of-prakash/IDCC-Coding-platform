import { Link, useLocation } from "react-router";
import logo from "../../assets/logo.png";
import { Category, DocumentCode, MedalStar, Setting2 } from "iconsax-react";
import "./Sidemenu.css";

const ACTIVE_COLOR = "var(--icon-active-color)";
const INACTIVE_COLOR = "red";

const menuItems = [
    { 
        name: "Overview", 
        path: "overview", 
        icon: <Category/> 
    },
    { 
        name: "Contest", 
        path: "contest", 
        icon: <MedalStar/> 
    },
    { 
        name: "Submissions", 
        path: "submissions", 
        icon: <DocumentCode/> 
    },
    { 
        name: "Settings", 
        path: "settings", 
        icon: <Setting2/> 
    }
];

const SideMenu = () => {
    const location = useLocation();
    const currentPath = location.pathname.split("/").pop();

    return (
        <div className="sidemenu df df_ai_center df_fd_c">
            <div className="logo df df_ai_center">
                <img className="logo_img" src={logo} alt="Logo of IDCC" />
                <p className="dfc">IDCC</p>
            </div>
            <ul className="menu_items df df_fd_c">
                {menuItems.map(({ name, path, icon }) => {
                    const isActive = currentPath === path;
                    return (
                        <li 
                            key={path} 
                            className={`menu_item df df_ai_center ${isActive ? "active" : ""}`}
                        >
                            <Link 
                                to={path} 
                                className="df df_ai_center"
                            >
                                {icon}
                                <span>{name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SideMenu;