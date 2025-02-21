import {Link } from "react-router";
import logo from "../../assets/logo.png"
import {Category,DocumentCode,MedalStar,Setting2 }from "iconsax-react"
import "./Sidemenu.css"
import UseTheme from "../../hooks/UseTheme"
const SideMenu=()=>{
    const {theme}=UseTheme()
    return <div className="sidemenu df df_ai_center df_fd_c">
        <div className="logo df df_ai_c">
            {/* <img className="logo_img" src={logo} alt="Logo of IDCC" /> */}
            <p>IDCC</p>
        </div> 
        <ul className="menu_items df df_fd_c">
            <li className="menu_item df df_ai_center">
                <Category color="var(--secondary-color)"/>
                <Link>Overview</Link>
            </li>
            <li className="menu_item df df_ai_center">
                <MedalStar color="var(--secondary-color)"/>
                <Link>Contest</Link>
            </li>
            <li className="menu_item df df_ai_center">
                <DocumentCode color="var(--secondary-color)"/>
                <Link>Submissions</Link>
            </li>
            <li className="menu_item df df_ai_center">
                <Setting2 color="var(--secondary-color)"/>
                <Link>Settings</Link>
            </li>
        </ul>
    </div>
}

export default SideMenu