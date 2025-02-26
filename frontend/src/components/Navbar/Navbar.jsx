import {Link, useLocation} from "react-router"
import "./Navbar.css"
import { uppercase } from "../../utils/uppercase"
import { ArrowRight2,Moon ,Sun1,Home2} from "iconsax-react"
import UserProfile from "../../assets/download.jpeg"
import UseTheme from "../../hooks/UseTheme"

const Navbar=()=>{
    const {theme,toggleTheme}=UseTheme()
    const location=useLocation()
    const allPaths=location.pathname.split("/").filter((path)=>path && path!=='admin')
    const path=location.pathname.split("/").pop()
    return <div className="Navbar df df_jc_space df_ai_center" >
           <div className="currentpath df">

            <Link to="overview" className="home_logo dfc">
                <Home2 color="var(--accent-color)" />
            </Link>

            {!(allPaths.length === 1 && allPaths[0] === "overview") && (
                <>
                    <div className="dfc bread_crumb_arrow">
                        <ArrowRight2 color="red" />
                    </div>

                    <div className="breadcrumbs df df_ai_center">
                        {allPaths
                            .filter(path => path !== "overview")
                            .map((path, index, filteredPaths) => (
                                <div key={index} className="df df_ai_center">
                                    <span>{uppercase(path)}</span>
                                    {index !== filteredPaths.length - 1 && (
                                        <ArrowRight2 color="var(--accent-color)" />
                                    )}
                                </div>
                            ))}
                    </div>
                </>
             )}
                </div>

            <div className="user_profile df df_jc_space">
                <div className="dark_mode dfc" onClick={toggleTheme}>
                   {theme=="dark"?<Sun1 color="var(--accent-color)"/>:<Moon color="var(--accent-color)"/>}
                </div>
                <div className="user_details df df_ai_center">
                    <div className="user_image_container"><img src={UserProfile} alt="user_profile" /></div>
                    <div className="user_name">
                        <p>Shadesofprakash</p>
                        <span>Admin</span>
                    </div>
                </div>
            </div>
    </div>
}
export default Navbar